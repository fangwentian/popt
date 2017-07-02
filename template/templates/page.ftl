{% extends "wrap/layout.html" %}
{% block head %}
<style>
</style>
{% endblock %}

{% block body %}
{{ macros.crumbs({"txt":"一级目录","url":'#'},{"txt":"二级目录"})}}
<div class="row">
    <div class="col-sm-12">
        <div class="m-card">
            <h2 class="card_b">
                <span class="glyphicon glyphicon-chevron-down pull-right"></span>
                二级目录
            </h2>
            <wgt-main/>
        </div>
    </div>
</div>
{% endblock %}

{% block script %}
<script>

</script>
<!-- @SCRIPT -->
<script src="{{nejRoot}}"></script>
<script src="{{jspro}}page/_$1/entry.js"></script>
{% endblock %}
