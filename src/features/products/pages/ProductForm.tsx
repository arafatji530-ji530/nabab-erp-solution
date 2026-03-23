/**
 * Products - Product Create/Edit Form
 * Comprehensive product creation with validation
 */

import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  makeStyles,
  shorthands,
  tokens,
  Button,
  Input,
  Label,
  Textarea,
  Title3,
  Text,
  Card,
  Dropdown,
  Option,
  MessageBar,
  MessageBarBody,
} from '@fluentui/react-components';
import {
  Save20Regular,
  Dismiss20Regular,
  ArrowLeft20Regular,
} from '@fluentui/react-icons';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema } from '@/shared/utils/validators';
import { apiService } from '@/services/api';

const useStyles = makeStyles({
  container: {
    maxWidth: '1000px',
    margin: '0 auto',
  },
  backButton: {
    marginBottom: tokens.spacingVerticalM,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalL),
    ...shorthands.padding(tokens.spacingVerticalXL),
  },
  formSection: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalM),
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    ...shorthands.gap(tokens.spacingHorizontalL),
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalS),
  },
  actions: {
    display: 'flex',
    ...shorthands.gap(tokens.spacingHorizontalM),
    justifyContent: 'flex-end',
    ...shorthands.padding(tokens.spacingVerticalL, '0'),
    ...shorthands.borderTop('1px', 'solid', tokens.colorNeutralStroke2),
  },
  errorText: {
    color: tokens.colorPaletteRedForeground1,
    fontSize: tokens.fontSizeBase200,
  },
  sectionTitle: {
    marginTop: tokens.spacingVerticalL,
    marginBottom: tokens.spacingVerticalM,
    ...shorthands.padding(tokens.spacingVerticalS, '0'),
    ...shorthands.borderBottom('2px', 'solid', tokens.colorBrandStroke1),
  },
});

type ProductFormData = {
  name: string;
  sku: string;
  category: string;
  brand: string;
  unitPrice: number;
  purchasePrice: number;
  taxRate: number;
  unit: string;
  description?: string;
  barcode?: string;
  reorderLevel: number;
  leadTimeDays: number;
};

export const ProductForm = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { id } = useParams();
  const [success, setSuccess] = useState(false);
  const isEditMode = !!id;

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      unitPrice: 0,
      purchasePrice: 0,
      taxRate: 15,
      reorderLevel: 10,
      leadTimeDays: 7,
    },
  });

  const onSubmit = async (data: ProductFormData) => {
    try {
      if (isEditMode) {
        await apiService.products.update(id, data as any);
      } else {
        await apiService.products.create(data as any);
      }
      setSuccess(true);
      setTimeout(() => {
        navigate('/products');
      }, 2000);
    } catch (error) {
      console.error('Failed to save product:', error);
    }
  };

  return (
    <div className={classes.container}>
      <Button
        appearance="subtle"
        icon={<ArrowLeft20Regular />}
        onClick={() => navigate('/products')}
        className={classes.backButton}
      >
        Back to Products
      </Button>

      <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>
        {isEditMode ? 'Edit Product' : 'Create New Product'}
      </Title3>

      {success && (
        <MessageBar intent="success" style={{ marginBottom: tokens.spacingVerticalL }}>
          <MessageBarBody>Product {isEditMode ? 'updated' : 'created'} successfully!</MessageBarBody>
        </MessageBar>
      )}

      <Card>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
          <div className={classes.sectionTitle}>
            <Text size={400} weight="semibold">
              Basic Information
            </Text>
          </div>

          <div className={classes.formRow}>
            <div className={classes.formGroup}>
              <Label required>Product Name</Label>
              <Controller
                name="name"
                control={control}
                render={({ field }) => <Input {...field} placeholder="Enter product name" />}
              />
              {errors.name && <span className={classes.errorText}>{errors.name.message}</span>}
            </div>

            <div className={classes.formGroup}>
              <Label required>SKU</Label>
              <Controller
                name="sku"
                control={control}
                render={({ field }) => <Input {...field} placeholder="Product SKU" />}
              />
              {errors.sku && <span className={classes.errorText}>{errors.sku.message}</span>}
            </div>
          </div>

          <div className={classes.formRow}>
            <div className={classes.formGroup}>
              <Label required>Category</Label>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Dropdown placeholder="Select category" {...field}>
                    <Option value="Power Tools">Power Tools</Option>
                    <Option value="Electrical">Electrical</Option>
                    <Option value="Safety Equipment">Safety Equipment</Option>
                    <Option value="Hardware">Hardware</Option>
                  </Dropdown>
                )}
              />
              {errors.category && (
                <span className={classes.errorText}>{errors.category.message}</span>
              )}
            </div>

            <div className={classes.formGroup}>
              <Label required>Brand</Label>
              <Controller
                name="brand"
                control={control}
                render={({ field }) => <Input {...field} placeholder="Brand name" />}
              />
              {errors.brand && <span className={classes.errorText}>{errors.brand.message}</span>}
            </div>
          </div>

          <div className={classes.sectionTitle}>
            <Text size={400} weight="semibold">
              Pricing & Tax
            </Text>
          </div>

          <div className={classes.formRow}>
            <div className={classes.formGroup}>
              <Label required>Unit Price (BDT)</Label>
              <Controller
                name="unitPrice"
                control={control}
                render={({ field }) => (
                  <Input
                    type="number"
                    {...field}
                    value={field.value?.toString() || ''}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                )}
              />
              {errors.unitPrice && (
                <span className={classes.errorText}>{errors.unitPrice.message}</span>
              )}
            </div>

            <div className={classes.formGroup}>
              <Label required>Purchase Price (BDT)</Label>
              <Controller
                name="purchasePrice"
                control={control}
                render={({ field }) => (
                  <Input
                    type="number"
                    {...field}
                    value={field.value?.toString() || ''}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                )}
              />
              {errors.purchasePrice && (
                <span className={classes.errorText}>{errors.purchasePrice.message}</span>
              )}
            </div>
          </div>

          <div className={classes.formRow}>
            <div className={classes.formGroup}>
              <Label required>Tax Rate (%)</Label>
              <Controller
                name="taxRate"
                control={control}
                render={({ field }) => (
                  <Input
                    type="number"
                    step="0.01"
                    {...field}
                    value={field.value?.toString() || ''}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                )}
              />
              {errors.taxRate && (
                <span className={classes.errorText}>{errors.taxRate.message}</span>
              )}
            </div>

            <div className={classes.formGroup}>
              <Label required>Unit of Measure</Label>
              <Controller
                name="unit"
                control={control}
                render={({ field }) => (
                  <Dropdown placeholder="Select unit" {...field}>
                    <Option value="Piece">Piece</Option>
                    <Option value="Box">Box</Option>
                    <Option value="Set">Set</Option>
                    <Option value="Meter">Meter</Option>
                    <Option value="Kilogram">Kilogram</Option>
                  </Dropdown>
                )}
              />
              {errors.unit && <span className={classes.errorText}>{errors.unit.message}</span>}
            </div>
          </div>

          <div className={classes.sectionTitle}>
            <Text size={400} weight="semibold">
              Inventory Settings
            </Text>
          </div>

          <div className={classes.formRow}>
            <div className={classes.formGroup}>
              <Label required>Reorder Level</Label>
              <Controller
                name="reorderLevel"
                control={control}
                render={({ field }) => (
                  <Input
                    type="number"
                    {...field}
                    value={field.value?.toString() || ''}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                )}
              />
              {errors.reorderLevel && (
                <span className={classes.errorText}>{errors.reorderLevel.message}</span>
              )}
            </div>

            <div className={classes.formGroup}>
              <Label required>Lead Time (Days)</Label>
              <Controller
                name="leadTimeDays"
                control={control}
                render={({ field }) => (
                  <Input
                    type="number"
                    {...field}
                    value={field.value?.toString() || ''}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                )}
              />
              {errors.leadTimeDays && (
                <span className={classes.errorText}>{errors.leadTimeDays.message}</span>
              )}
            </div>
          </div>

          <div className={classes.formGroup}>
            <Label>Barcode</Label>
            <Controller
              name="barcode"
              control={control}
              render={({ field }) => <Input {...field} placeholder="Product barcode" />}
            />
          </div>

          <div className={classes.formGroup}>
            <Label>Description</Label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  rows={4}
                  placeholder="Detailed product description..."
                />
              )}
            />
          </div>

          <div className={classes.actions}>
            <Button
              appearance="secondary"
              icon={<Dismiss20Regular />}
              onClick={() => navigate('/products')}
            >
              Cancel
            </Button>
            <Button
              appearance="primary"
              icon={<Save20Regular />}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : isEditMode ? 'Update Product' : 'Create Product'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
