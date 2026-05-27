# VisionPRO - Flujo Vibe Coding y Deploy

## Ruta local del repo

```powershell
cd "D:\AP\AP_Codex\G+ VisionPRO\github\visionpro"
```

## Archivos principales

- `visionpro/index.html`: estructura de la landing.
- `visionpro/styles.css`: linea grafica, responsive y componentes visuales.
- `visionpro/app.js`: calculadora, presets, modulos, niveles, categorias y descarga.
- `visionpro/assets/`: imagenes y recursos.

## Probar local

```powershell
cd "D:\AP\AP_Codex\G+ VisionPRO\github\visionpro\visionpro"
python -m http.server 8088 --bind 127.0.0.1
```

Abrir:

```text
http://127.0.0.1:8088/
```

## Publicar cambios

Desde la raiz del repo:

```powershell
cd "D:\AP\AP_Codex\G+ VisionPRO\github\visionpro"
git status
git add .
git commit -m "Update VisionPRO landing"
git push
```

GitHub Pages se despliega automaticamente con cada `git push`.

URL publica:

```text
https://apalpan.github.io/visionpro/
```

## Regla de iteracion

Para cambios puntuales:

1. Cambiar una cosa clara: copy, pricing, categoria, modulo, estilo o interaccion.
2. Probar local.
3. Commit con mensaje especifico.
4. Push.
5. Revisar GitHub Actions y la URL publica.

## Si Git pide permisos

Aceptar el prompt de GitHub Credential Manager o iniciar sesion en el navegador que aparezca. No guardar tokens dentro del repo.
