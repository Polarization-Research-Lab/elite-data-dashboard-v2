import pandas as pd

# Read the two CSV files into pandas DataFrames
csv1_path = 'test.csv'
csv2_path = 'd.csv'

df1 = pd.read_csv(csv1_path)
df2 = pd.read_csv(csv2_path)

# Merge the DataFrames based on 'bioguide_id' and 'source'
merged_df = pd.merge(df1, df2, on=['bioguide_id', 'source'], suffixes=('_x', '_y'))

# List of categories to compare
categories = ['blame', 'compromise', 'credit_claiming', 'insult', 'policy', 'foreign_policy', 'legislative_discussion']

# Check if the count columns match for each category
mismatch_list = []

for category in categories:
    col_x = f'{category}_count_x'
    col_y = f'{category}_count_y'
    
    mismatches = merged_df[col_x] != merged_df[col_y]
    
    if mismatches.any():
        mismatches_data = merged_df[mismatches][['bioguide_id', 'source', col_x, col_y]]
        mismatch_list.append({category: mismatches_data})

# Print the mismatched data
for mismatch in mismatch_list:
    category = list(mismatch.keys())[0]
    print(f"Mismatch in '{category}':")
    print(mismatch[category])
    print('\n')

# Print summary
print(f"Total mismatched categories: {len(mismatch_list)}")


