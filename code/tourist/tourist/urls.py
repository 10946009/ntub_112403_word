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
from myapp import old_views as old_views
from myapp.views import (
    index,
    login,
    forget_pwd,
    register,
    create_index,
    create,
    history,
    favorite,
    attraction_details,
    travel_detail,
    share,
    comment,
    user_edit,
)


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
    path("", index.index),
    path("login/", login.login),
    path("logout/", login.logout),
    path("forget_passwd/", forget_pwd.forget_passwd, name="forget_passwd"),
    path("reset_passwd/", forget_pwd.reset_passwd, name="reset_passwd"),
    path("register/", register.register),
    path("register_verification/<str:token>/", register.register_verification),
    path("search/", old_views.search),
    path("createindex/", create_index.create_index),
    # path('create/<int:ct_id>/<int:choiceday>',views.create),
    path("create/<int:ct_id>", create.create),
    path("history/", history.history),
    path("history/<int:select>", history.history),

    path("share/", share.share),
    path("add_favorite_share/", share.add_share),

    path("attraction_details/", attraction_details.attraction_details, name="search_results"),
    path("attraction_details/<int:aid>", attraction_details.attraction_details),
    # path("attraction_details/", attraction_details.attraction_details,name="search_results_base"),
    path(
        "serach_results_att_type",
        attraction_details.attraction_details_att_type,
        name="serach_results_att_type",
    ),
    # path("base/", attraction_details.attraction_details_search,name="search_results_base"),
    # path('test/',views.test_input),
    path("useredit/", user_edit.user_edit),

    path("favorite/", favorite.favorite),
    path("add_travel_favorite/", favorite.add_travel_favorite),  # 沒有頁面
    path("add_favorite/", favorite.add_favorite),  # 沒有頁面
    path("del_favorite/<int:a_id>", favorite.del_favorite),  # 沒有頁面
    path("del_travel_favorite/<int:ct_id>", favorite.del_travel_favorite),  # 沒有頁面
    # path('attraction_details/<int:a_id>',views.attraction_details),
    # path('sayhello/<str:username>',sayhello), #新增
    
    path('travel_detail/', travel_detail.travel_detail),
    path("travel_detail/<int:ctid>", travel_detail.travel_detail),
    path('comment/<int:aid>/', comment.save_attractions_comment,name="attraction_comment"),
    path('comment/', comment.save_travel_comment,name="travel_comment"),
]
