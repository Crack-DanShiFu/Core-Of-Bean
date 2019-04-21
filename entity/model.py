from exts import db


class User(db.Model):
    __tableName__ = 'user'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    userName = db.Column(db.String(20))
    userPassword = db.Column(db.String(10))


class PlantingArea(db.Model):
    __tableName__ = 'planting_area'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    city = db.Column(db.String(20))
    countyName = db.Column(db.String(20))
    yares2017 = db.Column(db.FLOAT)
    yares2016 = db.Column(db.FLOAT)
    yares2015 = db.Column(db.FLOAT)
    yares2014 = db.Column(db.FLOAT)
    yares2013 = db.Column(db.FLOAT)
    yares2012 = db.Column(db.FLOAT)
    yares2011 = db.Column(db.FLOAT)
    yares2010 = db.Column(db.FLOAT)
    yares2009 = db.Column(db.FLOAT)
    yares2008 = db.Column(db.FLOAT)
    yares2007 = db.Column(db.FLOAT)
    yares2006 = db.Column(db.FLOAT)
    yares2005 = db.Column(db.FLOAT)
    yares2004 = db.Column(db.FLOAT)
    yares2003 = db.Column(db.FLOAT)
    yares2002 = db.Column(db.FLOAT)
    yares2001 = db.Column(db.FLOAT)
    yares2000 = db.Column(db.FLOAT)


class PdfYearsRecord(db.Model):
    __tableName__ = 'pdf_years_record'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    city = db.Column(db.String(20))
    yarea2018 = db.Column(db.Integer, default=0)
    yarea2017 = db.Column(db.Integer, default=0)
    yarea2016 = db.Column(db.Integer, default=0)
    yarea2015 = db.Column(db.Integer, default=0)
    yarea2014 = db.Column(db.Integer, default=0)
    yarea2013 = db.Column(db.Integer, default=0)
    yarea2012 = db.Column(db.Integer, default=0)
    yarea2011 = db.Column(db.Integer, default=0)
    yarea2010 = db.Column(db.Integer, default=0)
    yarea2009 = db.Column(db.Integer, default=0)
    yarea2008 = db.Column(db.Integer, default=0)
    yarea2007 = db.Column(db.Integer, default=0)
    yarea2006 = db.Column(db.Integer, default=0)
    yarea2005 = db.Column(db.Integer, default=0)
    yarea2004 = db.Column(db.Integer, default=0)
    yarea2003 = db.Column(db.Integer, default=0)
    yarea2002 = db.Column(db.Integer, default=0)
    yarea2001 = db.Column(db.Integer, default=0)
    yarea2000 = db.Column(db.Integer, default=0)


class ProvincesInfo(db.Model):
    __tableName__ = 'provinces_info'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    years = db.Column(db.Integer)
    # Provinces = db.Column(db.String(20))
    areas = db.Column(db.FLOAT)
    production = db.Column(db.FLOAT)
