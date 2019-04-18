from flask import render_template

from main.server import *
from . import main


@main.route('/')
def index():
    return render_template('index.html')


@main.route('/get_all_info')
def get_all():
    return get_all_info()
