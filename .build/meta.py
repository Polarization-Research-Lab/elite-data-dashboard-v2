import json , urllib

import dataset

with open('../../../../.secrets/db.json', 'r') as file: creds = json.load(file)

import pandas as pd

import sqlalchemy as sql
import dataset

# Connect to DB
db_url = f"{creds['dialect']}://{creds['username']}:{urllib.parse.quote(creds['password'])}@localhost:{creds['port']}/elite"
db = dataset.connect(db_url)
legislators = db['legislators']


# # Get Legislators for each state
states_meta = {}
for state in legislators.distinct('state'):
    states_meta[state['state']] = pd.DataFrame(legislators.find(state = state['state']))['bioguide_id'].to_list()

with open('../_data/states-legislators.json', 'w') as file: json.dump(states_meta, file)
with open('../assets/data/states-legislators.json', 'w') as file: json.dump(states_meta, file)


# # Get Legislator meta data
legislators_meta = {}
for leg in legislators.all():
    legislators_meta[leg['bioguide_id']] = {
        'name': f"{leg['first_name']} {leg['last_name']}",
        'type': leg['type'],
        'senate_class': leg['senate_class'],
        'district': leg['district'],
        'party': leg['party'],
        'state': leg['state'],
    }
with open('../_data/legislators-meta.json', 'w') as file: json.dump(legislators_meta, file)
with open('../assets/data/legislators-meta.json', 'w') as file: json.dump(legislators_meta, file)
