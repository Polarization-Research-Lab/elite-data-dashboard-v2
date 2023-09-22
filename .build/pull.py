import json , urllib

import ibis

with open('../../../../.secrets/db.json', 'r') as file: creds = json.load(file)

import ibis
import pandas as pd

# # Establish a connection to your MySQL database
conn = ibis.mysql.connect(
    host = creds['host'],
    user = creds['username'],
    password = creds['password'],
    database = creds['database'],
)

# # Load the table
# table = conn.table('discourse_classification_0')

# # Define the categories
# categories = [
#     'blame',
#     'compromise',
#     'credit_claiming',
#     'insult',
#     'policy',
#     'foreign_policy',
#     'legislative_discussion'
# ]

# # Create a dictionary of aggregation expressions
# agg_exprs = {
#     'count': table.count(),
#     **{f'{c}_count': table[c].sum() for c in categories}
# }

# # Group by bioguide_id and source, then aggregate using the expressions
# agg_result = table.group_by(['bioguide_id', 'source']).aggregate(**agg_exprs)

# # Convert the Ibis result to a pandas DataFrame
# result_df = agg_result.execute()#.to_pandas()


# # Group by 'bioguide_id' and sum across the categories
# grouped = result_df.groupby('bioguide_id').sum(numeric_only = True).reset_index()

# # Add a new 'source' column with value 'total'
# grouped['source'] = 'total'

# # Concatenate the original DataFrame and the grouped DataFrame
# final_df = pd.concat([result_df, grouped])


# final_df.to_csv('.tmp.csv')

final_df = pd.read_csv('.tmp.csv')


# Get the list of category columns without _count
category_columns = [col.replace('_count', '') for col in final_df.columns if col.endswith('_count')]

# Add columns for each category's percent
for category in category_columns:
    percent_column = f'{category}_percent'
    final_df[percent_column] = final_df[category + '_count'] / final_df['count']

# Filter the DataFrame for rows where source is "total"
total_rows = final_df[final_df['source'] == 'total'].copy()

# Get the rank order for each category_percent within the "total" rows
for category in category_columns:
    percent_column = f'{category}_percent'
    rank_column = f'{category}_rank'
    total_rows[rank_column] = total_rows[percent_column].rank(ascending=False)

# Print the updated DataFrame with percent columns and rank columns
print(total_rows)


# for bid in final_df['bioguide_id'].unique():
#     print(bid)
#     legislator = {}






# Load the legislators.csv file into a pandas DataFrame
conn = ibis.mysql.connect(
    host = creds['host'],
    user = creds['username'],
    password = creds['password'],
    database = 'elite',
)

# Get Top
legislators_df = conn.table('legislators').execute()

# Assuming final_df and total_rows are already loaded

# List of categories to consider
categories = ['blame', 'compromise', 'credit_claiming', 'insult', 'policy', 'foreign_policy', 'legislative_discussion']

# Initialize a list to store legislator data
legislator_data_list = []

t = total_rows.copy()

t = t.nsmallest(5, 'insult_rank')['bioguide_id']
print(t)

exit()
# Iterate through unique bioguide_ids
for bioguide_id in final_df['bioguide_id'].unique():
    legislator_data = {}
    
    # Get legislator's data from legislators_df
    legislator = legislators_df[legislators_df['bioguide_id'] == bioguide_id].iloc[0]
    legislator_data['first_name'] = legislator['first_name']
    legislator_data['last_name'] = legislator['last_name']
    legislator_data['party'] = legislator['party']
    legislator_data['state'] = legislator['state']
    legislator_data['type'] = legislator['type']
    legislator_data['twitter'] = legislator['twitter']
    legislator_data['district'] = legislator['district']
    
    # Initialize scorecard dictionary
    scorecard = {}
    
    # Fill scorecard with category data
    for category in categories:
        scorecard[category] = {}
        scorecard[category]['count'] = int(total_rows.loc[total_rows['bioguide_id'] == bioguide_id, f'{category}_count'].values[0])
        scorecard[category]['percent'] = total_rows.loc[total_rows['bioguide_id'] == bioguide_id, f'{category}_percent'].values[0]
        scorecard[category]['rank'] = round(total_rows.loc[total_rows['bioguide_id'] == bioguide_id, f'{category}_rank'].values[0],2)
        scorecard[category]['sources'] = {}

        # Get source-specific data
        for source in ['floor', 'newsletters', 'statements', 'tweets']:
            source_data = {}
            source_filtered = final_df[(final_df['bioguide_id'] == bioguide_id) & (final_df['source'] == source)]

            if not source_filtered.empty:
                source_data['count'] = int(source_filtered[f'{category}_count'].iloc[0])
                source_data['percent'] = source_filtered[f'{category}_percent'].iloc[0]
            else:
                source_data['count'] = None
                source_data['percent'] = None

            scorecard[category]['sources'][source] = source_data
         

    legislator_data['scorecard'] = scorecard
    with open(f'../assets/data/legislators/{bioguide_id}.json','w') as file: 
        file.write(
            json.dumps(legislator_data).replace('NaN','null')
        )
    # with open(f'../assets/data/legislators/{bioguide_id}.json','w') as file: json.dump(legislator_data, file, indent = 4)
    

