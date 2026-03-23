/**
 * Products - Variant Management (Size, Color, Specifications)
 * EXPERT: Senior React Engineer (Advanced State Management)
 */

import { useState } from 'react';
import {
  makeStyles,
  shorthands,
  tokens,
  Button,
  Input,
  Title3,
  Text,
  Card,
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Badge,
  Checkbox,
  Label,
} from '@fluentui/react-components';
import {
  Add20Regular,
  Delete20Regular,
  Image20Regular,
  DataBarVertical20Regular,
} from '@fluentui/react-icons';
import { formatCurrency } from '@/shared/utils/formatters';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalL),
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '300px 1fr',
    ...shorthands.gap(tokens.spacingHorizontalL),
  },
  attributePanel: {
    ...shorthands.padding(tokens.spacingVerticalL),
  },
  variantPanel: {
    ...shorthands.padding(tokens.spacingVerticalL),
  },
  attributeList: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalS),
  },
  attributeItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalM),
    backgroundColor: tokens.colorNeutralBackground2,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    cursor: 'pointer',
    ...shorthands.transition('all', '150ms'),

    ':hover': {
      backgroundColor: tokens.colorBrandBackground2,
    },
  },
  variantBuilder: {
    ...shorthands.padding(tokens.spacingVerticalL),
    backgroundColor: tokens.colorNeutralBackground2,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    marginBottom: tokens.spacingVerticalL,
  },
  valueChips: {
    display: 'flex',
    flexWrap: 'wrap',
    ...shorthands.gap(tokens.spacingHorizontalS),
    marginTop: tokens.spacingVerticalS,
  },
  chip: {
    ...shorthands.padding(tokens.spacingVerticalXS, tokens.spacingHorizontalS),
    backgroundColor: tokens.colorBrandBackground2,
    ...shorthands.borderRadius(tokens.borderRadiusCircular),
    fontSize: tokens.fontSizeBase200,
  },
  variantTable: {
    width: '100%',
  },
  actionCell: {
    display: 'flex',
    ...shorthands.gap(tokens.spacingHorizontalXS),
  },
});

const ATTRIBUTES = [
  { id: '1', name: 'Size', values: ['Small', 'Medium', 'Large', 'XL'] },
  { id: '2', name: 'Color', values: ['Red', 'Blue', 'Green', 'Black', 'White'] },
  { id: '3', name: 'Material', values: ['Steel', 'Aluminum', 'Plastic'] },
  { id: '4', name: 'Voltage', values: ['110V', '220V', '380V'] },
];

const VARIANTS = [
  {
    id: '1',
    sku: 'DRL-SM-RED-STL',
    attributes: { Size: 'Small', Color: 'Red', Material: 'Steel' },
    price: 4500,
    stock: 45,
    image: null,
  },
  {
    id: '2',
    sku: 'DRL-MD-BLU-STL',
    attributes: { Size: 'Medium', Color: 'Blue', Material: 'Steel' },
    price: 4800,
    stock: 67,
    image: null,
  },
  {
    id: '3',
    sku: 'DRL-LG-BLK-ALU',
    attributes: { Size: 'Large', Color: 'Black', Material: 'Aluminum' },
    price: 5200,
    stock: 23,
    image: null,
  },
];

export const ProductVariants = () => {
  const classes = useStyles();
  const [selectedAttributes, setSelectedAttributes] = useState<Set<string>>(new Set(['1', '2']));

  const toggleAttribute = (id: string) => {
    const newSet = new Set(selectedAttributes);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedAttributes(newSet);
  };

  return (
    <div className={classes.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title3>Product Variants</Title3>
          <Text>Manage product variations with multiple attributes</Text>
        </div>
        <Button appearance="primary" icon={<DataBarVertical20Regular />}>
          Generate Variants
        </Button>
      </div>

      <div className={classes.grid}>
        <Card className={classes.attributePanel}>
          <Title3 style={{ marginBottom: tokens.spacingVerticalM }}>Attributes</Title3>
          <div className={classes.attributeList}>
            {ATTRIBUTES.map((attr) => (
              <div
                key={attr.id}
                className={classes.attributeItem}
                style={{
                  backgroundColor: selectedAttributes.has(attr.id)
                    ? tokens.colorBrandBackground2
                    : tokens.colorNeutralBackground2,
                }}
              >
                <Checkbox
                  checked={selectedAttributes.has(attr.id)}
                  onChange={() => toggleAttribute(attr.id)}
                  label={attr.name}
                />
              </div>
            ))}
            <Button appearance="subtle" icon={<Add20Regular />} style={{ marginTop: tokens.spacingVerticalS }}>
              New Attribute
            </Button>
          </div>
        </Card>

        <Card className={classes.variantPanel}>
          <Card className={classes.variantBuilder}>
            <Title3 style={{ marginBottom: tokens.spacingVerticalM }}>Variant Builder</Title3>
            {ATTRIBUTES.filter((a) => selectedAttributes.has(a.id)).map((attr) => (
              <div key={attr.id} style={{ marginBottom: tokens.spacingVerticalM }}>
                <Label>{attr.name}</Label>
                <div className={classes.valueChips}>
                  {attr.values.map((value, idx) => (
                    <div key={idx} className={classes.chip}>
                      {value}
                    </div>
                  ))}
                  <Button appearance="subtle" icon={<Add20Regular />} size="small">
                    Add Value
                  </Button>
                </div>
              </div>
            ))}
            <Text size={300} style={{ marginTop: tokens.spacingVerticalM }}>
              Will generate {VARIANTS.length} variants based on selected attributes
            </Text>
          </Card>

          <Title3 style={{ marginBottom: tokens.spacingVerticalM }}>
            Generated Variants ({VARIANTS.length})
          </Title3>

          <Table className={classes.variantTable}>
            <TableHeader>
              <TableRow>
                <TableHeaderCell>SKU</TableHeaderCell>
                <TableHeaderCell>Attributes</TableHeaderCell>
                <TableHeaderCell>Price</TableHeaderCell>
                <TableHeaderCell>Stock</TableHeaderCell>
                <TableHeaderCell>Image</TableHeaderCell>
                <TableHeaderCell>Actions</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {VARIANTS.map((variant) => (
                <TableRow key={variant.id}>
                  <TableCell>
                    <Text weight="semibold">{variant.sku}</Text>
                  </TableCell>
                  <TableCell>
                    <div style={{ display: 'flex', gap: tokens.spacingHorizontalXS, flexWrap: 'wrap' }}>
                      {Object.entries(variant.attributes).map(([key, value]) => (
                        <Badge key={key} appearance="tint" size="small">
                          {key}: {value}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      defaultValue={variant.price.toString()}
                      size="small"
                      style={{ width: '100px' }}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      defaultValue={variant.stock.toString()}
                      size="small"
                      style={{ width: '80px' }}
                    />
                  </TableCell>
                  <TableCell>
                    <Button appearance="subtle" icon={<Image20Regular />} size="small">
                      Upload
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div className={classes.actionCell}>
                      <Button appearance="subtle" icon={<Delete20Regular />} size="small" />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: tokens.spacingHorizontalM, marginTop: tokens.spacingVerticalL }}>
            <Button appearance="secondary">Cancel</Button>
            <Button appearance="primary">Save All Variants</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
