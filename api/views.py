from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import ToDo
from .serializers import ToDoSerializer

# Create your views here.
@api_view(["GET"])
def getToDo(request):
    items = ToDo.objects.all()
    serializers = ToDoSerializer(items, many=True)
    return Response(serializers.data)

@api_view(["POST"])
def postToDo(request):
    print(request.data)
    item = ToDo()
    serializer = ToDoSerializer(item, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)

@api_view(["DELETE"])
def deleteToDo(request):
    item = ToDo.objects.get(id = request.data['id'])
    item.delete()
    return Response({"response": "Successfully deleted item."})