import json
from sys import displayhook
import pandas as pd 

# source: https://github.com/OpenSourceActivismTech/us-zipcodes-congress
data = pd.read_csv('source.csv', dtype = {'zcta': 'str'})

with open('../../assets/data/legislators.json', 'r') as file: legis = json.load(file)

output = {}

# zips = {z: [] for z in data['zcta']}
# legis = {leg: legs['state'] for leg in legis}
# print(zips)

states = {}
for state in data['state_abbr'].unique():
    states[state] = [
        leg 
        for leg in legis 
        if legis[leg]['state'] == state
    ]

for i in data.index:
    zipdata = data.loc[i]
    output[zipdata['zcta']] = [
        leg
        for leg in states[zipdata['state_abbr']]
        if (legis[leg]['district'] is not None) & (legis[leg]['district'] == zipdata['cd'])
    ]

output = {
    'zips': output,
    'states': states,
}

with open('../../assets/data/searchmaps.json', 'w') as file: json.dump(output, file)

