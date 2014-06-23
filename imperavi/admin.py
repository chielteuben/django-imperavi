from django.contrib import admin
from django.db.models import TextField
from django.conf import settings

from widget import ImperaviWidget


class ImperaviAdmin(admin.ModelAdmin):

    unique_media = False

    formfield_overrides = {
        TextField: {'widget': ImperaviWidget},
    }

    def formfield_for_dbfield(self, db_field, **kwargs):
        field = super(ImperaviAdmin, self).formfield_for_dbfield(db_field, **kwargs)
        if getattr(field, 'widget', False) and field.widget.__class__ == ImperaviWidget and self.unique_media:
            field.widget.upload_path += '%s/' % db_field.model.__name__.lower()
        return field

    class Media:
        js = (
            'http://code.jquery.com/jquery-1.11.1.min.js',
            '%simperavi/redactor/redactor.min.js' % settings.STATIC_URL,
            '%simperavi/fontfamily.js' % settings.STATIC_URL,
            '%simperavi/fontsize.js' % settings.STATIC_URL,
            '%simperavi/fontcolor.js' % settings.STATIC_URL,
        )
        css = {
            'all': (
                "%simperavi/redactor/css/redactor.css" % settings.STATIC_URL,
            ),
        }


class ImperaviStackedInlineAdmin(admin.StackedInline):

    unique_media = False

    formfield_overrides = {
        TextField: {'widget': ImperaviWidget},
    }

    def formfield_for_dbfield(self, db_field, **kwargs):
        field = super(ImperaviStackedInlineAdmin, self).formfield_for_dbfield(db_field, **kwargs)
        if getattr(field, 'widget', False) and field.widget.__class__ == ImperaviWidget and self.unique_media:
            field.widget.upload_path += '%s/' % db_field.model.__name__.lower()
        return field

    class Media:
        js = (
            'http://code.jquery.com/jquery-1.11.1.min.js',
            '%simperavi/redactor/redactor.min.js' % settings.STATIC_URL,
            '%simperavi/fontfamily.js' % settings.STATIC_URL,
            '%simperavi/fontsize.js' % settings.STATIC_URL,
            '%simperavi/fontcolor.js' % settings.STATIC_URL,
        )
        css = {
            'all': (
                "%simperavi/redactor/css/redactor.css" % settings.STATIC_URL,
            ),
        }
