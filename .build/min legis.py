import json

with open('../assets/data/legislators.json', 'r') as file: legis = json.load(file)

with open('../assets/data/legislators-min.json', 'w') as file:
    json.dump(
        {
            leg: {
                'type': legis[leg]['type'],
                'name': legis[leg]['first_name'] + ' ' + legis[leg]['last_name'],

            }
            for leg in legis
        },
        file
    )


