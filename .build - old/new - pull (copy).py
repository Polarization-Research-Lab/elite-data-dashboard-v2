import json 

import ibis

with open('../../../lab/.secrets/db.json', 'r') as file: creds = json.load(file)

import ibis
import pandas as pd

# Establish a connection to your MySQL database
conn = ibis.mysql.connect(
    host = creds['host'],
    user = creds['username'],
    password = creds['password'],
    database = creds['database'],
)

# Load the table
table = conn.table('discourse_classification_0')

# Define the categories
categories = [
    'blame',
    'compromise',
    'credit_claiming',
    'insult',
    'policy',
    'foreign_policy',
    'legislative_discussion'
]

# Create a dictionary of aggregation expressions
agg_exprs = {
    'count': table.count(),
    **{f'{c}_count': table[c].sum() for c in categories}
}

# Group by bioguide_id and source, then aggregate using the expressions
agg_result = table.group_by(['bioguide_id', 'source']).aggregate(**agg_exprs)

# Convert the Ibis result to a pandas DataFrame
result_df = agg_result.execute()#.to_pandas()
result_df.to_csv('test.csv')

# Print or use the resulting DataFrame as needed
# print(result_df)
# 

exit()


# --- Sanity checks ---
# print('unique ids: ', result_df['bioguide_id'].unique().shape[0])
# print('unique sources: ', result_df['source'].unique().shape[0])

# # Count the number of unique sources per bioguide_id
# unique_sources_per_id = result_df.groupby('bioguide_id')['source'].nunique()

# # Count occurrences of different unique source counts
# unique_source_counts = unique_sources_per_id.value_counts().sort_index(ascending=False)

# # Print the unique source counts
# for count, occurrences in unique_source_counts.items():
#     print(f"Number of bioguide_ids with {count} unique sources: {occurrences}")


# Open the file for writing
with open('sanitycheck.txt', 'w') as file:
    # Loop over unique bioguide_ids

    # print(table.bioguide_id.cases().execute())
    for bioguide_id in table[['bioguide_id']].distinct().execute().values:
        print(f"Bioguide ID: {bioguide_id}", file=file)

        # Filter the table for the current bioguide_id
        bioguide_table = table.filter(table.bioguide_id == bioguide_id[0])
        # Loop over unique sources for the current bioguide_id
        for source in bioguide_table[['source']].distinct().execute().values:
            print(f"\tSource: {source}", file=file)
            
            # Filter the table for the current bioguide_id and source
            source_table = bioguide_table.filter(bioguide_table.source == source[0])
            
            # Loop over categories and count occurrences of 1
            for category in categories:
                category_count = source_table[category].sum().execute()
                print(f"\t\t{category}: {category_count}", file=file)

# Print completion message
print("Sanity check results saved to sanitycheck.txt")



