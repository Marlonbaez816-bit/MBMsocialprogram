"""
MBM - Social Program
App base con carga dinámica de módulos desde GitHub.
"""
import kivy
kivy.require('2.1.0')
from kivy.app import App
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.button import Button
from kivy.uix.label import Label
import requests
import os
import json
import threading

GITHUB_USER = "Marlonbaez816-bit"
GITHUB_REPO = "MBMsocialprogram"
GITHUB_BASE = f"https://raw.githubusercontent.com/{GITHUB_USER}/{GITHUB_REPO}/main"
CARPETA_MBM = "/storage/emulated/0/MBM"
CARPETA_MODULOS = f"{CARPETA_MBM}/modulos"

class GestorModulos:
    def __init__(self):
        self.modulos = {}
        self.config = {}
        self.crear_carpetas()
        self.cargar_configuracion()
    def crear_carpetas(self):
        os.makedirs(CARPETA_MBM, exist_ok=True)
        os.makedirs(CARPETA_MODULOS, exist_ok=True)
    def cargar_configuracion(self):
        try:
            url = f"{GITHUB_BASE}/config.json"
            resp = requests.get(url, timeout=10)
            if resp.status_code == 200:
                self.config = resp.json()
        except:
            self.config = {"modulos_base": []}
    def sincronizar_modulos(self):
        self.cargar_configuracion()
        for url in self.config.get("modulos_base", []):
            nombre = url.split("/")[-1].replace(".py", "")
            try:
                r = requests.get(url)
                if r.status_code == 200:
                    with open(f"{CARPETA_MODULOS}/{nombre}.py", "w") as f:
                        f.write(r.text)
            except:
                pass
    def ejecutar_modulo(self, nombre):
        ruta = f"{CARPETA_MODULOS}/{nombre}.py"
        if os.path.exists(ruta):
            with open(ruta, "r") as f:
                exec(f.read())

class MBMApp(App):
    def build(self):
        self.gestor = GestorModulos()
        self.gestor.sincronizar_modulos()
        layout = BoxLayout(orientation='vertical', spacing=10, padding=20)
        layout.add_widget(Label(text="MBM - Social Program", size_hint_y=0.3))
        botones = ["Chat", "Estados", "Perfil", "Tokens", "Ganancias", "Contactos"]
        for nombre in botones:
            btn = Button(text=nombre, size_hint_y=0.15)
            btn.bind(on_press=lambda x, n=nombre: self.abrir_modulo(n.lower()))
            layout.add_widget(btn)
        btn_salir = Button(text="Salir", size_hint_y=0.1)
        btn_salir.bind(on_press=self.stop)
        layout.add_widget(btn_salir)
        return layout
    def abrir_modulo(self, nombre):
        threading.Thread(target=self.gestor.ejecutar_modulo, args=(nombre,), daemon=True).start()

if __name__ == "__main__":
    MBMApp().run()
