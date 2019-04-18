# import xlrd
#
# from entity.model import PlantingArea
# from exts import db
#
# readbook = xlrd.open_workbook('1.xlsx')
# sheet = readbook.sheet_by_index(0)  # 索引的方式，从0开始
#
# for i in range(0, 79):
#     sql = 'INSERT INTO planting_area VALUES(' + str(i + 1)
#     for j in range(20):
#         value = sheet.row_values(i)[j]
#         if value in ['', '无']:
#             value = 0.0
#         # print(value, end='')
#         sql += ', '
#         sql += '\'' + str(value) + '\''
#
#     sql += ')'
#     print(sql, end='')
#     db.session.execute(sql)
#     db.session.commit()
#     print('\n')
