from flask import render_template, redirect, url_for

from main.server import *
from . import main


@main.route('/')
def index():
    return render_template('index.html')


@main.route('/detail_info/<city>')
def detail_info(city):
    return render_template('detail_info.html')


@main.route('/modify/<city>')
def modify_info(city):
    data = get_info_by_county(city)
    return render_template('modify.html', data=json.loads(data))


@main.route('/modify/<city>/submit')
def modify_info_submit(city):
    return redirect(url_for('/'))


@main.route('/get_all_info')
def get_all():
    return get_all_info()


@main.route('/get_city_info/<city>')
def get_city_info(city):
    if '%' in city:
        return get_info_by_county(city)
    return get_info_by_city(city)


# get_provinces_info
@main.route('/get_provinces_info/')
def get_provinces():
    return get_provinces_info()
