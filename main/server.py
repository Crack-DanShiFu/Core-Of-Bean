import json

from exts import db


def get_city_list():
    sql = 'select city,count(id) from planting_area group by city order by count(id)  ;'
    sql_lists = db.session.execute(sql)
    entity_l = {'result': []}
    for s in sql_lists:
        entity_l['result'].append([
            s.city,
            s[1]
        ])
    entity_l['city_num'] = len(entity_l['result'])
    return json.dumps(entity_l, ensure_ascii=False)


def get_county_list():
    sql = 'select city,countyName from planting_area;'
    sql_lists = db.session.execute(sql)
    entity_l = {'result': {}, 'countyNum': 0}
    for s in sql_lists:
        if s.city not in entity_l['result'].keys():
            entity_l['result'][s.city] = []
        entity_l['result'][s.city].append(s.countyName)
        entity_l['countyNum'] += 1
    return json.dumps(entity_l, ensure_ascii=False)


def get_info_by_city(city):
    sql = "select * from planting_area where city ='{}' ;".format(city)
    sql_lists = db.session.execute(sql)
    entity_l = {'result': {city: []}}
    for s in sql_lists:
        entity_l['result'][city].append(s[2:])
    return json.dumps(entity_l, ensure_ascii=False)


def get_all_info():
    columnsNmae = ['id', 'city', 'countyName', 'yares2017', 'yares2016', 'yares2015', 'yares2014', 'yares2013',
                   'yares2012', 'yares2011', 'yares2010', 'yares2009', 'yares2008', 'yares2007', 'yares2006',
                   'yares2005', 'yares2004', 'yares2003', 'yares2002', 'yares2001', 'yares2000']

    sql = "select * from planting_area"
    sql_lists = db.session.execute(sql)
    entity_l = []
    for s in sql_lists:
        entity_l.append(s[0:])
    result = [dict(zip(columnsNmae, e)) for e in entity_l]
    return json.dumps(result, ensure_ascii=False)


def get_info_by_county(county):
    sql = "select * from planting_area where countyName ='{}' ;".format(county)
    sql_lists = db.session.execute(sql)
    entity_l = {'result': []}
    for s in sql_lists:
        entity_l['result'].append(s[2:])
        entity_l['city'] = s[1]
    return json.dumps(entity_l, ensure_ascii=False)
