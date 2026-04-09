# 🎮 Simulación de Círculos Interactivos

Este proyecto es una aplicación web interactiva desarrollada con **HTML, CSS y JavaScript**, que simula un sistema de círculos en movimiento dentro de un canvas.

Los círculos se comportan como partículas dinámicas que pueden ser interactuadas mediante el mouse, generando una experiencia visual tipo videojuego.

---

## 🚀 Características

* 🔴 Generación de círculos animados en canvas
* 🖱️ Interacción con el mouse (hover y click)
* 💥 Eliminación de círculos con animación (fade out)
* 🎯 Sistema de niveles (8 niveles, 10 círculos por nivel)
* ⚡ Incremento progresivo de velocidad por nivel
* 📊 Indicadores en tiempo real:

  * Círculos eliminados
  * Porcentaje de progreso
  * Círculos restantes para el siguiente nivel
* 🎨 Interfaz moderna con **Glassmorphism**
* 🌆 Fondo visual estilo *Spider-Verse*

---

## 🧠 Lógica del juego

* Se generan **80 círculos en total**
* Cada nivel contiene **10 círculos**
* El usuario debe hacer clic sobre los círculos para eliminarlos
* Al eliminar todos los círculos de un nivel:

  * Se avanza automáticamente al siguiente nivel
  * Aumenta la velocidad de los círculos
* El juego finaliza al completar los 8 niveles

---

## 🗂️ Estructura del proyecto

```
app-canvas-interactivo/
│
├── index.html
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── main.js
│   └── img/
│       └── fondo.jpg
```

---

## ⚙️ Tecnologías utilizadas

* HTML5
* CSS3 (Glassmorphism, Flexbox)
* JavaScript (Canvas API)

---

## ▶️ Cómo ejecutar

1. Clona o descarga el proyecto
2. Abre la carpeta en Visual Studio Code
3. Ejecuta con **Live Server** o abre `index.html` en el navegador

---

## 📸 Vista previa

Interfaz con fondo dinámico, panel tipo vidrio y animaciones en tiempo real.

---

## 📌 Autor

Proyecto desarrollado como práctica de animación en canvas y diseño de interfaces modernas.

---

## 💡 Posibles mejoras

* 🎮 Sistema de puntuación
* ⏱️ Temporizador por nivel
* 💥 Animaciones de explosión
* 🔊 Efectos de sonido
* 📱 Diseño responsive

---

## 📄 Licencia

Este proyecto es de uso académico y libre para fines educativos.

---
