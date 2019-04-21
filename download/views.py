import os

from flask import render_template, send_from_directory

from download.server import *
from . import download


@download.route('/')
def index():
    data = json.loads(get_pdf_years_record(None))
    return render_template('download.html', data=data)


# province list
@download.route('/get_list_pdf/<city>')
def get_list_province_pdf(city):
    return get_pdf_years_record(city)


@download.route("/files/<filename>", methods=['GET'])
def download_file(filename):
    # 需要知道2个参数, 第1个参数是本地目录的path, 第2个参数是文件名(带扩展名)
    directory = os.getcwd()  # 假设在当前目录
    cityName = str(filename).split('&')[0]
    yaer = str(filename).split('&')[1]
    path = os.listdir('安徽省历年统计年鉴/' + cityName)
    for p in path:
        if yaer in p:
            filename = '安徽省历年统计年鉴/' + cityName + '/' + p
    return send_from_directory(directory, filename, as_attachment=True)
