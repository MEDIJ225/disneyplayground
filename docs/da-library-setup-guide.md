# DA Library Setup Guide — Block Library for AEM Edge Delivery Services

## Overview

This guide documents how to set up the Block Library in the DA (Document Authoring) editor for AEM Edge Delivery Services. The Library allows content authors to browse and insert pre-configured blocks directly into their documents.

## Prerequisites

- A DA-based AEM Edge Delivery Services project (content source: `content.da.live`)
- Access to the DA editor at `da.live`
- Blocks already created in the `blocks/` directory of your code repository

## Architecture

The Library in DA requires three components:

1. **Block Documents** — Individual documents with example content for each block
2. **Blocks Sheet** — A spreadsheet that maps block names to their document paths
3. **Config Sheet** — The site configuration that tells DA where to find the library

```
Content Source (DA)
├── library/
│   ├── blocks/
│   │   ├── accordion      (document — block example + Library Metadata)
│   │   ├── cards           (document)
│   │   ├── columns         (document)
│   │   └── ...
│   └── blocks              (sheet — name/path mapping)
└── .da/
    └── config              (sheet — library tab pointing to blocks.json)
```

## Step-by-Step Setup

### Step 1: Create the Folder Structure

1. Open `https://da.live/#/{org}/{site}`
2. Create a folder called `library`
3. Inside `library`, create a folder called `blocks`

### Step 2: Create Block Documents

For each block you want in the Library, create a document inside `library/blocks/`.

Each document must contain:
- A table with the block name as the header and example content rows
- A section break (horizontal rule)
- A `Library Metadata` table with a `Description` field

**Example: Accordion block document** (`library/blocks/accordion`)

```
┌──────────────────────────────────────────────┐
│                 Accordion                     │
├──────────────────────┬───────────────────────┤
│ What are the races?  │ 5K, 10K, Half, Full   │
│ What is the min age? │ At least 5 years old  │
└──────────────────────┴───────────────────────┘

──────────────── section break ────────────────

┌──────────────────────────────────────────────┐
│            Library Metadata                   │
├──────────────────────┬───────────────────────┤
│ Description          │ Expandable accordion  │
│                      │ with Q&A pairs        │
└──────────────────────┴───────────────────────┘
```

After creating each document:
- **Preview** the document
- **Publish** the document

### Step 3: Create the Blocks Sheet

1. Open `https://da.live/sheet#/{org}/{site}/library/blocks`
2. This creates a spreadsheet. Add two columns:

| name | path |
|------|------|
| Accordion | `https://content.da.live/{org}/{site}/library/blocks/accordion` |
| Cards | `https://content.da.live/{org}/{site}/library/blocks/cards` |
| Columns | `https://content.da.live/{org}/{site}/library/blocks/columns` |

3. Save, Preview, and Publish the sheet

### Step 4: Configure the Library in Site Config

1. Open `https://da.live/config#/{org}/{site}/`
2. Ensure two tabs exist: `data` and `library`
   - If `library` tab doesn't exist, click "Add sheet" and name it `library`
   - Keep the `data` tab (do not delete it)
3. In the `library` tab, add:

| title | path |
|-------|------|
| Blocks | `https://content.da.live/{org}/{site}/library/blocks.json` |

4. Save the config

### Step 5: Verify

1. Open any document in the DA editor: `https://da.live/edit#/{org}/{site}/index`
2. Hard refresh: **Cmd+Shift+R** (Mac) or **Ctrl+Shift+R** (Windows)
3. Click the **Library** button in the left sidebar
4. Blocks should appear listed by name
5. Click a block to preview it, then drag or click to insert into the document

## Adding New Blocks

To add a new block to the Library:

1. Create a document at `library/blocks/{block-name}` in DA
2. Add the block table with example content + Library Metadata table
3. Preview and Publish the document
4. Add a row to the blocks sheet (`da.live/sheet#/{org}/{site}/library/blocks`):
   - name: `Block Name`
   - path: `https://content.da.live/{org}/{site}/library/blocks/{block-name}`
5. Save and Publish the sheet
6. Refresh the editor — the new block appears in the Library

## Block Variants

Blocks can have visual variants. Add the variant name in parentheses in the block table header:

```
┌──────────────────────────────────────────────┐
│            Accordion (faq)                    │
├──────────────────────┬───────────────────────┤
│ How do I register?   │ Visit the website...  │
└──────────────────────┴───────────────────────┘
```

Variants appear as sub-items under the block name in the Library.

## Troubleshooting

| Issue | Solution |
|-------|---------|
| Library panel is empty | Verify the config has both `data` and `library` tabs. Hard refresh the editor. |
| Block not appearing | Check that the block document is Published (not just Previewed). |
| Config not loading | Ensure the `library` tab in config points to the correct `.json` URL. |
| Sheet returns 404 | Preview and Publish the blocks sheet from DA. |

## Project-Specific Values

| Variable | Value |
|----------|-------|
| org | `medij225` |
| site | `disneyplayground` |
| Config URL | `https://da.live/config#/medij225/disneyplayground/` |
| Blocks Sheet | `https://da.live/sheet#/medij225/disneyplayground/library/blocks` |
| Block Documents | `https://da.live/#/medij225/disneyplayground/library/blocks` |

## References

- [DA Library Setup Documentation](https://docs.da.live/administrators/guides/setup-library)
- [AEM Sidekick Library](https://experienceleague.adobe.com/docs/experience-manager-cloud-service/content/edge-delivery/resources/sidekick/sidekick-library.html)
