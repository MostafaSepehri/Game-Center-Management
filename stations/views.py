from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .models import Station
from .forms import StationForm


# Create your views here.
@login_required
def station_view(request):
    gamenet = request.user.gamenet
    
    if request.method == "POST":     
        form = StationForm(request.POST)
        if form.is_valid():
            station = form.save(commit=False)
            station.gamenet = gamenet
            station.save()
            messages.success(request, 'ایستگاه افزوده شد!')
            return redirect('stations:index')
    else:
        form = StationForm()
        
    stations = Station.objects.filter(gamenet=gamenet)
    context = {'form': form, 'stations': stations}
    return render(request, 'stations/index.html', context)


@login_required
def station_edit(request, pk):
    gamenet = request.user.gamenet
    station = get_object_or_404(Station, pk=pk, gamenet=gamenet)

    if request.method == "POST":
        form = StationForm(request.POST, instance=station)
        if form.is_valid():
            form.save()
            messages.success(request, 'ایستگاه ویرایش شد!')
            return redirect('stations:index')
    else:
        form = StationForm(instance=station)

    return render(request, "stations/index.html", {"form": form, "station": station})


def station_delete(request, pk):

    station = get_object_or_404(Station, pk=pk)
    station.delete()
    messages.success(request, 'ایستگاه حذف شد!')
    return redirect("stations:index")