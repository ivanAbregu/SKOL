from datetime import timedelta

import os, warnings

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


if not os.environ.get('SECRET_KEY'):
    warnings.warn((
                      "Please define SECRET_KEY before importing {0}, as a fallback "
                      "for when the environment variable is not available."
                  ).format(__name__))
else:
    SECRET_KEY = os.environ.get('SECRET_KEY')


def env(key, default=None):
    """Retrieves env vars and makes Python boolean replacements"""
    val = os.getenv(key, default)

    if val == 'True':
        val = True
    elif val == 'False':
        val = False
    return val


DEBUG = env("DJANGO_DEBUG", True)


ALLOWED_HOSTS = ['*']

SITE_ID=1

WSGI_APPLICATION = 'web.wsgi.application'

ROOT_URLCONF = 'web.urls'


#############################################
#  Application definition
#############################################

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.sites',

    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    'django_extensions',
    
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'bootstrap3',
    'djmail', # send async email
    "compressor",
    'webpack_loader',

    'rest_framework',
    'django_filters',
    'des',
    'rest_auth',
    'web',

    'apps.core',
    'apps.user',
    'apps.task'
]


#############################################
#  MIDDLEWARE
#############################################
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django.middleware.locale.LocaleMiddleware',
]

if env("ENVIRONMENT", "local") == 'local':
    MIDDLEWARE.append('apps.core.middleware.dev_cors_middleware')


#############################################
#  TEMPLATES CONFIG
#############################################

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            "%s%s" % (BASE_DIR, '/web/templates/')
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.template.context_processors.media',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]



#############################################
#  DATABASE CONFIG
#############################################
DATABASES = {
    'default': {
        'ENGINE': os.environ['DB_ENGINE'],
        'NAME': os.environ['DB_NAME'],
        'USER': os.environ['DB_USER'],
        'PASSWORD': os.environ['DB_PASS'],
        'HOST': os.environ['DB_HOST'],
        'PORT': os.environ['DB_PORT'],
    } 
}

#############################################
#  AUTHENTICATION CONFIG
#############################################

FIXTURE_DIRS = (
   "%s%s" % (BASE_DIR, '/apps/demo/fixtures/'),
)


#############################################
#  AUTHENTICATION CONFIG
#############################################

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

AUTHENTICATION_BACKENDS = (
    # Needed to login by username in Django admin, regardless of `allauth`
    'django.contrib.auth.backends.ModelBackend',

    # `allauth` specific authentication methods, such as login by e-mail
    'allauth.account.auth_backends.AuthenticationBackend',

    #'apps.user.auth_backends.CustomAuthenticationBackend'
)

#AUTH_GROUP_MODEL = 'apps.user.models.CustomGroup'

AUTH_USER_MODEL = 'user.User'

LOGIN_URL = '/accounts/login/'
LOGOUT_URL = '/accounts/logout/'

LOGIN_REDIRECT_URL = '/'
ACCOUNT_AUTHENTICATED_LOGIN_REDIRECTS = '/'

ACCOUNT_LOGOUT_ON_GET = True


#############################################
# ALLAUTH
#############################################
ACCOUNT_AUTHENTICATION_METHOD = 'email'
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_UNIQUE_EMAIL = True
ACCOUNT_USERNAME_REQUIRED = False
ACCOUNT_USER_MODEL_USERNAME_FIELD = None
ACCOUNT_EMAIL_VERIFICATION = None

ACCOUNT_FORMS = {
    'signup': 'apps.user.forms.CustomSignupForm',
    'login': 'apps.user.forms.CustomLoginForm',
}

#USERNAME_REQUIRED = False

REST_AUTH_SERIALIZERS = {
    'LOGIN_SERIALIZER': 'apps.user.api.serializers.CustomLoginSerializer',
    'JWT_SERIALIZER': 'apps.user.api.serializers.CustomJWTSerializer'
}

REST_AUTH_REGISTER_SERIALIZERS = {
    'REGISTER_SERIALIZER': 'apps.user.api.serializers.CustomRegisterSerializer'
}

REST_USE_JWT = True

#ACCOUNT_ADAPTER = 'apps.user.adapter.CustomAccountAdapter'

#############################################
# LOCALES & LANG
#############################################

LANGUAGE_CODE = "es-es"




USE_I18N = False 

USE_L10N = True

USE_TZ = True


#############################################
# STATIC FILES
#############################################

STATIC_URL = '/static/'

STATIC_ROOT = BASE_DIR + '/static/'

STATICFILES_FINDERS = [
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
    'compressor.finders.CompressorFinder',
]

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, "assets"),
]

COMPRESS_PRECOMPILERS = (
    ('text/x-sass', 'sass {infile} {outfile}'),
)

#############################################
# WEBPACK TO RENDER REACT
#############################################
WEBPACK_LOADER = {
    'DEFAULT': {
        'BUNDLE_DIR_NAME': 'bundles/',
        'STATS_FILE': os.path.join(BASE_DIR, 'webpack-stats.dev.json') if env('ENVIRONMENT', 'local') == 'local'
        else os.path.join(BASE_DIR, 'webpack-stats.prod.json'),
    },


}

if env("ENVIRONMENT", "local") != 'local':
    COMPRESS_OFFLINE = True

MEDIA_URL='/media/'

MEDIA_ROOT = BASE_DIR + '/media/'

#############################################
# CONFIG EMAIL
#############################################

#EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
#EMAIL_BACKEND = "djmail.backends.async.EmailBackend"
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend' #RESUMA

#DJMAIL_REAL_BACKEND = 'des.backends.ConfiguredEmailBackend'
#DJMAIL_REAL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
    
EMAIL_USE_TLS = True
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_HOST_USER = 'ivan.abregu@gmail.com'
EMAIL_HOST_PASSWORD = 'qwqw1212'
EMAIL_SUBJECT_PREFIX ="dd" 
DEFAULT_FROM_EMAIL = "Team"
ACCOUNT_EMAIL_SUBJECT_PREFIX=""


###################################################################
##### CONFIG REST FRAMEWORK
###################################################################

REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': (
        'rest_framework.renderers.JSONRenderer',
        'rest_framework.renderers.BrowsableAPIRenderer',
    ),
    'PAGE_SIZE': 10,
    'DEFAULT_FILTER_BACKENDS': ('django_filters.rest_framework.DjangoFilterBackend',),
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_jwt.authentication.JSONWebTokenAuthentication',
        'rest_framework.authentication.BasicAuthentication',
        'rest_framework.authentication.SessionAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
    'DEFAULT_PAGINATION_CLASS': 'web.pagination.CustomPageNumberPagination',

    'DATETIME_FORMAT' : '%m/%d/%Y %H:%M:%S',
    'LANGUAGE_CODE': "es",
}


###################################################################
##### JsonWebToken CONFIG
###################################################################
import datetime

JWT_AUTH = {
    'JWT_ENCODE_HANDLER':
        'rest_framework_jwt.utils.jwt_encode_handler',

    'JWT_DECODE_HANDLER':
        'rest_framework_jwt.utils.jwt_decode_handler',

    'JWT_PAYLOAD_HANDLER':
        'rest_framework_jwt.utils.jwt_payload_handler',

    'JWT_PAYLOAD_GET_USER_ID_HANDLER':
        'rest_framework_jwt.utils.jwt_get_user_id_from_payload_handler',

    'JWT_RESPONSE_PAYLOAD_HANDLER':
        'rest_framework_jwt.utils.jwt_response_payload_handler',

    'JWT_SECRET_KEY': SECRET_KEY,
    'JWT_PUBLIC_KEY': None,
    'JWT_PRIVATE_KEY': None,
    'JWT_ALGORITHM': 'HS256',
    'JWT_VERIFY': True,
    'JWT_VERIFY_EXPIRATION': True,
    'JWT_LEEWAY': 0,
    'JWT_EXPIRATION_DELTA': datetime.timedelta(seconds=3000000000),
    'JWT_AUDIENCE': None,
    'JWT_ISSUER': None,

    'JWT_ALLOW_REFRESH': True,
    'JWT_REFRESH_EXPIRATION_DELTA': datetime.timedelta(days=7),

    'JWT_AUTH_HEADER_PREFIX': 'JWT',
}


#############################################
# CONFIG DJANDO CITIES LIGHT
#############################################

# CITIES_LIGHT_TRANSLATION_LANGUAGES = ['es']

# CITIES_LIGHT_INCLUDE_COUNTRIES = ['AR']

# CITIES_LIGHT_INCLUDE_CITY_TYPES = ['PPL', 'PPLA', 'PPLA2', 'PPLA3', 'PPLA4', 'PPLC', 'PPLF', 'PPLG', 'PPLL', 'PPLR', 'PPLS', 'STLMT',]

# CITIES_LIGHT_APP_NAME = 'cities'

# MIGRATION_MODULES = {
#     'cities_light': None
# }

###################################################################
##### CONFIG BROKER FOR CELERY
###################################################################

# BROKER_URL = "amqp://{user}:{password}@rabbitmq:5672//?heartbeat=30".format(
#     user=os.environ.get('RABBITMQ_DEFAULT_USER'),
#     password=os.environ.get('RABBITMQ_DEFAULT_PASS')
# )
#
# broker_url = BROKER_URL
#
# CELERY_BROKER_URL = broker_url
#
# CELERY_RESULT_BACKEND = broker_url
#
# CELERY_TIMEZONE = 'UTC'

###################################################################
##### CONFIG CELERY TASK
###################################################################

# CELERYBEAT_SCHEDULE = {
#     'alert_listener': {
#         'task': 'apps.alert.tasks.alert_listener',
#         'schedule': timedelta(minutes=5),
#     },
#     'get_travels': {
#         'task': 'apps.travel.tasks.getTravels',
#         'schedule': crontab(minute=0, hour=3),
#     },
# }

###################################################################
##### CONFIG CHANNEL_LAYERS
###################################################################

# CHANNEL_LAYERS = {
#     'default': {
#         'BACKEND': 'asgi_redis.RedisChannelLayer',
#         'CONFIG': {
#             'hosts': [('redis', 6379)],
#         },
#         'ROUTING': 'sils.routing.channel_routing',
#     }
# }

###################################################################
##### CONFIG LOGGING
###################################################################

LOGGING = {
    'version': 1,
    'disable_existing_loggers': True,
    'formatters': {
        'verbose': {
            'format': '%(levelname)s %(asctime)s %(module)s %(process)d %(thread)d %(message)s'
        },
        'simple': {
            'format': '%(levelname)s %(message)s'
        },
        'standard': {
            'format': '%(asctime)s %(levelname)s %(name)s %(message)s'
        },
    },
    'filters': {
        'require_debug_true': {
            '()': 'django.utils.log.RequireDebugTrue',
        },
    },
    'handlers': {
        'default': {
            'level':'DEBUG',
            'class':'logging.handlers.RotatingFileHandler',
            'filename': BASE_DIR + '/logs/default.log',
            'maxBytes': 1024*1024*5, # 5 MB
            'backupCount': 5,
            'formatter':'standard',
        },
        'mail_admins': {
            'level': 'ERROR',
            'class': 'django.utils.log.AdminEmailHandler',
        },    
        'emails': {
            'level':'DEBUG',
            'class':'logging.handlers.RotatingFileHandler',
            'filename': BASE_DIR + '/logs/emails.log',
            'maxBytes': 1024*1024*5, # 5 MB
            'backupCount': 5,
            'formatter':'standard',
        },
    },
    'loggers': {
        '': {
            'handlers': ['default'],
            'level': 'DEBUG',
            'propagate': True
        },
        'django.request': {
            'handlers': ['default', 'mail_admins'],
            'level': 'ERROR',
            'propagate': False,
        },
        'emails': {
            'handlers': ['emails'],
            'level': 'DEBUG',
            'propagate': True
        },
        
    }
}

if env("ENVIRONMENT", "local") != 'local':
    ADMINS = [
        ('Matias (Dev)', 'matiroson@gmail.com'),
    ]
    MANAGERS = ADMINS
