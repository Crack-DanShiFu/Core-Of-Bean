import json

from exts import db


def get_pdf_years_record(city):
    sql = "select * from pdf_years_record where 1=1 "
    if city is not None:
        sql += "and city = '{}'".format(city)
    sql_lists = db.session.execute(sql)
    entity_l = []
    for s in sql_lists:
        entity_l.append(s[1:])
    return json.dumps(entity_l, ensure_ascii=False)
