from django import forms
from .models import UploadFileModel


class DocumentForm(forms.ModelForm):
    class Meta:
        model = UploadFileModel
        fields = ("description", "images")
