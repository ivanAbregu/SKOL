from django.contrib.sites.models import Site
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.template.loader import render_to_string
from apps.core.utils import send_email



@receiver(post_save, sender='user.User')
def notification_post_save(sender, *args, **kwargs):
    if kwargs['created']:
        user = kwargs['instance']
        # Send notification
        if user.email and not user.is_superuser:
            context_data = {}
            context_data['current_site'] = Site.objects.first()
            context_data['user'] = user

            message = render_to_string('account/email/welcome.html', context_data)
            subject = '¡Te damos la bienvenida a %s!' % context_data['current_site'].name

            send_email(subject, message, [user.email,])
