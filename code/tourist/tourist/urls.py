"""tourist URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
import myapp.views as views

# from myapp.views import sayhello,get_all_taiwan,opentime #新增

urlpatterns = [
    path("admin/", admin.site.urls),
    # path('sayhello/',views.sayhello),#測試
    # path('test/',views.get_all_taiwan),#測試
    # path('opentime/',views.opentime), #測試
    # path('admin_index/',views.admin_index),
    # path('admin_login/',views.admin_login),
    # path('admin_manageuser/',views.admin_manageuser),
    # path('admin_comment/',views.admin_comment),
    path("", views.index),
    path("login/", views.login),
    path("logout/", views.logout),
    path("forget_passwd/", views.forget_passwd, name="forget_passwd"),
    path("reset_passwd/", views.reset_passwd, name="reset_passwd"),
    path("register/", views.register),
    path("register_verification/<str:token>/", views.register_verification),
    path("search/", views.search),
    path("createindex/", views.create_index),
    # path('create/<int:ct_id>/<int:choiceday>',views.create),
    path("create/<int:ct_id>", views.create),
    path("history/", views.history),
    path("favorite/", views.favorite),
    path("share/", views.share),
    path("attraction_details/", views.attraction_details, name="search_results"),
    path("attraction_details/<int:aid>", views.attraction_details),
    # path('test/',views.test_input),
    path("useredit/", views.user_edit),
    path("add_favorite/", views.add_favorite),  # 沒有頁面
    # path('attraction_details/<int:a_id>',views.attraction_details),
    # path('sayhello/<str:username>',sayhello), #新增
]
