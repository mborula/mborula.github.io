from flask import Flask, render_template, request, redirect, url_for, abort
from model.Auto import Auto

app = Flask(__name__)


@app.route("/")
@app.route("/autos")
def auto_index():
    autos = Auto.find_all()
    return render_template("auto/index.html",autos=autos)


@app.route("/autos/create", methods=["GET", "POST"])
def auto_create():
    if request.method == "POST":
        auto = Auto.from_dict(request.form)
        auto.save()
        return redirect(url_for("auto_index"))
    return render_template("auto/create.html")


@app.route("/autos/<int:auto_id>")
def auto_show(auto_id):
    auto = Auto.find(auto_id)
    if not auto:
        abort(404)
    return render_template("auto/show.html",auto=auto)


@app.route("/autos/<int:auto_id>/edit", methods=["GET", "POST"])
def auto_edit(auto_id):
    auto = Auto.find(auto_id)

    if not auto:
        abort(404)

    if request.method == "POST":
        auto.fill(request.form)
        auto.save()

        return redirect(url_for("auto_index"))

    return render_template(
        "auto/edit.html",
        auto=auto
    )


@app.route("/autos/<int:auto_id>/delete", methods=["POST"])
def auto_delete(auto_id):
    auto = Auto.find(auto_id)
    if not auto:
        abort(404)
    auto.delete()
    return redirect(url_for("auto_index"))


if __name__ == "__main__":
    app.run(debug=True, port=57939)