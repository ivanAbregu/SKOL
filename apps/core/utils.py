import logging
from datetime import datetime

from des.models import DynamicEmailConfiguration
from django.conf import settings
from django.core.mail import send_mail as dj_send_email
from django.utils.text import slugify
from pytz import timezone

logger = logging.getLogger('emails')


def get_local_date():
	return  datetime.now(timezone('America/Argentina/Cordoba'))


def generate_unique_slug(from_class, from_strs):
	slug = ''
	for s in from_strs:
		slug += slugify(s)
	for x in range(1000):
		tmp_slug = slug
		if x > 1:
			tmp_slug += "_%s" % x
		try:
			from_class.objects.get(slug=tmp_slug)
		except from_class.DoesNotExist:
			return tmp_slug



def send_email(subject, body, to):
	config = DynamicEmailConfiguration.get_solo()
	try:
		dj_send_email(
			subject,
			body,
			config.from_email or settings.DEFAULT_FROM_EMAIL,
			to,
			html_message=body)
	except Exception as e:
		logger.error("Could not send email. {}".format(e))