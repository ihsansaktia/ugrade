from django.core.exceptions import ValidationError
from graphene_django.views import GraphQLView
from graphene_file_upload.django import FileUploadGraphQLView


class ContestView(FileUploadGraphQLView):
    @staticmethod
    def format_error(error):
        if hasattr(error, 'original_error') and isinstance(error.original_error, ValidationError):
            err_dict = error.original_error.message_dict

            def to_camel(strs):
                components = strs.split('_')
                return components[0] + ''.join(x.title() for x in components[1:])

            err_dict = {to_camel(k): err_dict[k] for k in err_dict}

            return {
                "code": "InvalidInput",
                "message": "Invalid User Input",
                "validations": err_dict
            }
        return GraphQLView.format_error(error)
