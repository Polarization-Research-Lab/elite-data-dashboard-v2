import os, json

with open('../../../../.secrets/db.json', 'r') as file:
    creds = json.load(file)

import ibis
import pandas as pd

## Connect to new elite database with updated users
conn = ibis.mysql.connect(
    host=creds['host'],
    user=creds['username'],
    password=creds['password'],
    database=creds['database'],
)
legislators = conn.table('legislators')

# Build Harvest Summary
s = {
   "floor": "Floor Speeches",
   "newsletters": "Newsletters",
   "statements": "Public Statements",
   "tweets": "Tweets", 
}

sources = list(s.keys())
source_labels = list(s.values())

k = {
    "insult": 'Use of Insults',
    "policy": 'Discussion of Policy Issues',
    "foreign_policy": "Discussion of Foreign Policy Issues",
}
key_columns = list(k.keys())
key_column_labels = list(k.values())

## Connect to origianl database
conn = ibis.mysql.connect(
    host=creds['host'],
    user=creds['username'],
    password=creds['password'],
    database=creds['database'],
)
classif = conn.table('discourse_classification_0')

# print(classif.schema())
# print(legislators.schema())

classif_mutated = classif.mutate(**{
    f'{col}': ibis.ifelse(classif[col] == 9, None, classif[col])
    for col in key_columns
})

# Group by 'bioguide_id' and calculate sum and mean for each column
result = classif_mutated.group_by('bioguide_id').aggregate(
    count = classif_mutated['bioguide_id'].count(),
    **{col + '_sum': classif_mutated[f'{col}'].sum() for col in key_columns},
    **{col + '_mean': classif_mutated[f'{col}'].mean() for col in key_columns},
)

result = result.execute()
result = result.merge(legislators[['bioguide_id', 'party']].execute(), on = 'bioguide_id', how = 'left')

categories = {}
categories_dem = {}
categories_rep = {}

# Iterate through the key columns
meta = {'category_ranks': {}, 'category_ranks_dem': {}, 'category_ranks_rep': {}}
for column in key_columns:
    categories[column] = {}
    categories_dem[column] = {}
    categories_rep[column] = {}

    # Dems
    # Get the 10 users with the highest mean for the current column
    top_politicians = result.query(f'count >= 200 and party == "Democrat"').sort_values(by=column + '_mean', ascending=False).head(5)
    meta['category_ranks_dem'][column] = top_politicians['bioguide_id'].values.tolist()

    # Iterate through the top users and save JSON files
    for idx, (_, politician) in enumerate(top_politicians.iterrows()):
        bioguide_id = politician['bioguide_id']

        l = legislators.filter(legislators['bioguide_id'] == bioguide_id)[['first_name', 'last_name', 'party', 'state', 'district']].execute()

        # Filter rows with a value of 1 in the original category column
        politician_rows = classif.filter((classif[column] == 1) & (classif['bioguide_id'] == bioguide_id))[key_columns + ['text']].execute()

        data = {
            'first_name': l['first_name'].loc[0],
            'last_name': l['last_name'].loc[0],
            'count': int(result[result['bioguide_id'] == bioguide_id][f'{column}_sum'].values[0]),
            'percent': round(result[result['bioguide_id'] == bioguide_id][f'{column}_mean'].values[0] * 100, 2),
            'party': l['party'].loc[0],
            'rank': str(int(idx+1)),
            'state': l['state'].loc[0],
            'district': int(l['district'].loc[0]),
        }

        categories_dem[column][bioguide_id] = data

    # ---

    # Reps
    # Get the 10 users with the highest mean for the current column
    top_politicians = result.query(f'count >= 200 and party == "Republican"').sort_values(by=column + '_mean', ascending=False).head(5)
    meta['category_ranks_rep'][column] = top_politicians['bioguide_id'].values.tolist()

    # Iterate through the top users and save JSON files
    for idx, (_, politician) in enumerate(top_politicians.iterrows()):
        bioguide_id = politician['bioguide_id']

        l = legislators.filter(legislators['bioguide_id'] == bioguide_id)[['first_name', 'last_name', 'party', 'state', 'district']].execute()

        # Filter rows with a value of 1 in the original category column
        politician_rows = classif.filter((classif[column] == 1) & (classif['bioguide_id'] == bioguide_id))[key_columns + ['text']].execute()

        data = {
            'first_name': l['first_name'].loc[0],
            'last_name': l['last_name'].loc[0],
            'count': int(result[result['bioguide_id'] == bioguide_id][f'{column}_sum'].values[0]),
            'percent': round(result[result['bioguide_id'] == bioguide_id][f'{column}_mean'].values[0] * 100, 2),
            'party': l['party'].loc[0],
            'rank': str(int(idx+1)),
            'state': l['state'].loc[0],
            'district': int(l['district'].loc[0]),
        }

        categories_rep[column][bioguide_id] = data

alldata = {'categories': {}}
for category in categories:
    alldata['categories'][category] = {
        'dems': categories_dem[category],
        'reps': categories_rep[category],
    }

alldata['source_labels'] = s
alldata['category_labels'] = k


with open('../_data/carousel.json', 'w') as json_file:
    json.dump(alldata, json_file)





