import json 

import ibis

with open('../../../lab/.secrets/db.json', 'r') as file: creds = json.load(file)

import ibis
import pandas as pd

# Establish a conn to your MySQL database
conn = ibis.mysql.connect(
    host = creds['host'],
    user = creds['username'],
    password = creds['password'],
    database = creds['database'],
)

# Load the tables
discourse_classification = conn.table('discourse_classification_0')

# Define a dictionary to map source to the corresponding table name
source_to_table = {
    'floor': 'floor',
    'tweets': 'tweets',
    'newsletters': 'newsletters',
    'statements': 'statements'
}

# Loop through each source and create date expressions
for source, table_name in source_to_table.items():
    print(source)
    source_table = conn.table(table_name)
    join_expr = (
        (discourse_classification.source == source) &
        (discourse_classification.source_id == source_table.id)
    )
    if source == 'newsletters':
        joined_data = discourse_classification.join(source_table, join_expr)
        min_date = joined_data.datetime.min().name(f'min_{source}_date')
        max_date = joined_data.datetime.max().name(f'max_{source}_date')
    else: 
        joined_data = discourse_classification.join(source_table, join_expr)
        min_date = joined_data.date.min().name(f'min_{source}_date')
        max_date = joined_data.date.max().name(f'max_{source}_date')
    mmin = min_date.execute()
    mmax = max_date.execute()
    print('\t', mmin, mmax)

exit()
# Construct the final select expression
select_expr = [discourse_classification] + date_exprs

# Execute the query
result = connection.execute(select_expr)

# Print the result
print(result)