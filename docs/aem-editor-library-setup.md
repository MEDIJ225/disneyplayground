# AEM Universal Editor — Library Setup

## Problem

Blocks defined in the `blocks/` directory were not appearing in the AEM Universal Editor's Library panel. Authors could not drag-and-drop components when editing pages.

## Root Cause

The project was missing two required configuration files that the AEM Universal Editor uses to populate the Library:

- `component-definition.json` — Registers blocks and organizes them into groups
- `component-models.json` — Defines the editable fields for each block

Without these files, the editor has no knowledge of available blocks.

## Solution

Created both files at the project root.

### component-definition.json

Registers every block as a component and organizes them into four groups:

| Group | Blocks |
|-------|--------|
| Content | Accordion, Cards, Columns, Hero, Tabs, Callout, Carousel, Embed, Fragment, Video, Vista Button |
| Layout | Icon List, Download List, Sticky Nav, Modal, Multi Image, Promo Carousel |
| Events | Event Detail, Event Grid, Event Header, Events Landing |
| Blog | Blog Home, Blog Filter, Featured Blogs, Video Gallery |

Each component entry follows this structure:

```json
{
  "title": "Block Name",
  "id": "block-name",
  "plugins": {
    "xwalk": {
      "page": {
        "resourceType": "core/franklin/components/block",
        "template": {
          "name": "Block Name",
          "model": "block-name"
        }
      }
    }
  }
}
```

### component-models.json

Defines the editable fields for each block. Field types used:

| Component Type | Purpose |
|---------------|---------|
| `text` | Single-line text input |
| `richtext` | Rich text editor (headings, links, formatting) |
| `reference` | Asset picker (images, documents) |
| `select` | Dropdown with predefined options |
| `boolean` | Toggle switch (true/false) |

Example model (Vista Button):

```json
{
  "id": "vista-button",
  "fields": [
    { "component": "text", "name": "label", "label": "Button Text / Link", "valueType": "string" },
    { "component": "select", "name": "variant", "label": "Variant", "valueType": "string",
      "options": [
        { "name": "Primary", "value": "primary" },
        { "name": "Secondary", "value": "secondary" }
      ]
    },
    { "component": "boolean", "name": "disabled", "label": "Disabled", "valueType": "boolean" }
  ]
}
```

## Files Changed

| File | Action |
|------|--------|
| `component-definition.json` | Created — block registration for the Library |
| `component-models.json` | Created — editable field definitions per block |

## How to Add a New Block to the Library

1. Create the block in `blocks/{block-name}/`
2. Add a component entry in `component-definition.json` under the appropriate group
3. Add a model entry in `component-models.json` with the block's editable fields
4. Commit and push — AEM Code Sync will pick up the changes

## References

- [AEM Block Collection — Component Models](https://www.aem.live/developer/block-collection)
- [Universal Editor — Component Definition](https://www.aem.live/docs/setup-universal-editor#component-definition)
