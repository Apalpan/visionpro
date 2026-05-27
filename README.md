# VisionPRO Client Calculator

Landing web interactiva para cotizar VisionPRO en obras de construccion.

## Contenido

- `visionpro/`: sitio estatico listo para GitHub Pages.
- `.github/workflows/deploy.yml`: despliegue automatico a GitHub Pages desde la carpeta `visionpro`.

## Uso local

Abrir directamente:

```text
visionpro/index.html
```

O servir localmente:

```powershell
cd visionpro
python -m http.server 8087 --bind 127.0.0.1
```

Luego abrir:

```text
http://127.0.0.1:8087/
```

## Despliegue

1. Crear un repositorio en GitHub llamado `visionpro`.
2. Hacer push de este repositorio local a GitHub.
3. GitHub Actions publicara automaticamente la carpeta `visionpro/` en GitHub Pages.

La URL esperada sera:

```text
https://<usuario-github>.github.io/visionpro/
```
