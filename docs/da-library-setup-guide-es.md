# Guía de Configuración de Library en DA — Block Library para AEM Edge Delivery Services

## Resumen

Esta guía documenta cómo configurar la Block Library en el editor DA (Document Authoring) para AEM Edge Delivery Services. La Library permite a los autores de contenido explorar e insertar bloques preconfigurados directamente en sus documentos.

## Prerrequisitos

- Un proyecto AEM Edge Delivery Services basado en DA (content source: `content.da.live`)
- Acceso al editor DA en `da.live`
- Bloques ya creados en el directorio `blocks/` del repositorio de código

## Arquitectura

La Library en DA requiere tres componentes:

1. **Documentos de Bloques** — Documentos individuales con contenido de ejemplo para cada bloque
2. **Sheet de Bloques** — Una hoja de cálculo que mapea nombres de bloques a sus rutas de documentos
3. **Sheet de Config** — La configuración del sitio que le dice a DA dónde encontrar la library

```
Content Source (DA)
├── library/
│   ├── blocks/
│   │   ├── accordion      (documento — ejemplo del bloque + Library Metadata)
│   │   ├── cards           (documento)
│   │   ├── columns         (documento)
│   │   └── ...
│   └── blocks              (sheet — mapeo name/path)
└── .da/
    └── config              (sheet — pestaña library apuntando a blocks.json)
```

## Paso a Paso

### Paso 1: Crear la Estructura de Carpetas

1. Abrir `https://da.live/#/{org}/{site}`
2. Crear una carpeta llamada `library`
3. Dentro de `library`, crear una carpeta llamada `blocks`

### Paso 2: Crear Documentos de Bloques

Para cada bloque que quieras en la Library, crea un documento dentro de `library/blocks/`.

Cada documento debe contener:
- Una tabla con el nombre del bloque como header y filas con contenido de ejemplo
- Un separador de sección (línea horizontal)
- Una tabla `Library Metadata` con un campo `Description`

**Ejemplo: Documento del bloque Accordion** (`library/blocks/accordion`)

```
┌──────────────────────────────────────────────┐
│                 Accordion                     │
├──────────────────────┬───────────────────────┤
│ Cuáles son las       │ 5K, 10K, Media        │
│ distancias?          │ Maratón, Maratón      │
│ Cuál es la edad      │ Al menos 5 años       │
│ mínima?              │                       │
└──────────────────────┴───────────────────────┘

──────────────── section break ────────────────

┌──────────────────────────────────────────────┐
│            Library Metadata                   │
├──────────────────────┬───────────────────────┤
│ Description          │ Acordeón expandible   │
│                      │ con pares de P&R      │
└──────────────────────┴───────────────────────┘
```

Después de crear cada documento:
- Hacer **Preview** del documento
- Hacer **Publish** del documento

### Paso 3: Crear el Sheet de Bloques

1. Abrir `https://da.live/sheet#/{org}/{site}/library/blocks`
2. Esto crea una hoja de cálculo. Agregar dos columnas:

| name | path |
|------|------|
| Accordion | `https://content.da.live/{org}/{site}/library/blocks/accordion` |
| Cards | `https://content.da.live/{org}/{site}/library/blocks/cards` |
| Columns | `https://content.da.live/{org}/{site}/library/blocks/columns` |

3. Guardar, hacer Preview y Publish del sheet

### Paso 4: Configurar la Library en el Config del Sitio

1. Abrir `https://da.live/config#/{org}/{site}/`
2. Asegurarse de que existan dos pestañas: `data` y `library`
   - Si la pestaña `library` no existe, click en "Add sheet" y nombrarla `library`
   - Mantener la pestaña `data` (no borrarla)
3. En la pestaña `library`, agregar:

| title | path |
|-------|------|
| Blocks | `https://content.da.live/{org}/{site}/library/blocks.json` |

4. Guardar el config

### Paso 5: Verificar

1. Abrir cualquier documento en el editor DA: `https://da.live/edit#/{org}/{site}/index`
2. Hard refresh: **Cmd+Shift+R** (Mac) o **Ctrl+Shift+R** (Windows)
3. Click en el botón **Library** en la barra lateral izquierda
4. Los bloques deberían aparecer listados por nombre
5. Click en un bloque para previsualizarlo, luego arrastrar o hacer click para insertarlo en el documento

## Agregar Nuevos Bloques

Para agregar un nuevo bloque a la Library:

1. Crear un documento en `library/blocks/{nombre-del-bloque}` en DA
2. Agregar la tabla del bloque con contenido de ejemplo + tabla Library Metadata
3. Hacer Preview y Publish del documento
4. Agregar una fila al blocks sheet (`da.live/sheet#/{org}/{site}/library/blocks`):
   - name: `Nombre del Bloque`
   - path: `https://content.da.live/{org}/{site}/library/blocks/{nombre-del-bloque}`
5. Guardar y hacer Publish del sheet
6. Refrescar el editor — el nuevo bloque aparece en la Library

## Variantes de Bloques

Los bloques pueden tener variantes visuales. Agrega el nombre de la variante en paréntesis en el header de la tabla del bloque:

```
┌──────────────────────────────────────────────┐
│            Accordion (faq)                    │
├──────────────────────┬───────────────────────┤
│ Cómo me registro?    │ Visita el sitio web...│
└──────────────────────┴───────────────────────┘
```

Las variantes aparecen como sub-items bajo el nombre del bloque en la Library.

## Solución de Problemas

| Problema | Solución |
|----------|----------|
| Panel de Library vacío | Verificar que el config tenga ambas pestañas `data` y `library`. Hacer hard refresh del editor. |
| Bloque no aparece | Verificar que el documento del bloque esté Publicado (no solo Preview). |
| Config no carga | Asegurar que la pestaña `library` en config apunte a la URL `.json` correcta. |
| Sheet retorna 404 | Hacer Preview y Publish del blocks sheet desde DA. |

## Valores Específicos del Proyecto

| Variable | Valor |
|----------|-------|
| org | `medij225` |
| site | `disneyplayground` |
| URL del Config | `https://da.live/config#/medij225/disneyplayground/` |
| Sheet de Bloques | `https://da.live/sheet#/medij225/disneyplayground/library/blocks` |
| Documentos de Bloques | `https://da.live/#/medij225/disneyplayground/library/blocks` |

## Referencias

- [Documentación de DA Library Setup](https://docs.da.live/administrators/guides/setup-library)
- [AEM Sidekick Library](https://experienceleague.adobe.com/docs/experience-manager-cloud-service/content/edge-delivery/resources/sidekick/sidekick-library.html)
