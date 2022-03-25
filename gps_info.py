from PIL import Image
from PIL.ExifTags import TAGS, GPSTAGS

# Get latitude and longitude information
def conv_deg(v):
    # Converting fractions to degrees
    d = float(v[0][0]) / float(v[0][1])
    m = float(v[1][0]) / float(v[1][1])
    s = float(v[2][0]) / float(v[2][1])
    return d + (m / 60.0) + (s / 3600.0)

def get_gps(fname):
    # open img files
    im = Image.open(fname)

    # Get exif information in dictionary form
    exif = { 
        TAGS[key]: value  for key, value in im._getexif().items()  if key in TAGS 
    }

    # get gps info
    gps_tags = exif["GPSInfo"]
    gps = { 
        GPSTAGS.get(t, t): gps_tags[t]  for t in gps_tags 
    }

    lat = conv_deg(gps["GPSLatitude"])
    lat_ref = gps["GPSLatitudeRef"]
    if lat_ref != "N":
        lat = 0 - lat

    lon = conv_deg(gps["GPSLongitude"])
    lon_ref = gps["GPSLongitudeRef"]
    if lon_ref != "E":
        lon = 0 - lon


    return lat, lon
