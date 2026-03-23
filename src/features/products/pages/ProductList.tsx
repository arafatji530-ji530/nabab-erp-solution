import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  makeStyles,
  shorthands,
  tokens,
  Button,
  Input,
  Title3,
  Text,
  Card,
  Spinner,
  Badge,
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  Textarea,
  Field,
  Switch,
  Dropdown,
  Option,
  TabList,
  Tab,
  MessageBar,
  MessageBarBody,
} from '@fluentui/react-components';
import {
  Add20Regular,
  Search20Regular,
  MoreVertical20Regular,
  Edit20Regular,
  Delete20Regular,
  Eye20Regular,
  Dismiss20Regular,
  Image20Regular,
  Delete24Regular,
} from '@fluentui/react-icons';
import { apiService } from '@/services/api';
import { formatCurrency } from '@/shared/utils/formatters';
import { useDebounce } from '@/shared/hooks';
import type { Product, PaginatedResponse } from '@/types/domain';
import type { ProductAPI } from '@/types/api';

// Product Form Validation Schema
const productSchema = z.object({
  name: z.string().min(3, 'Product name must be at least 3 characters').max(200, 'Product name is too long'),
  code: z.string().min(2, 'Product code is required').max(50, 'Product code is too long'),
  sku: z.string().min(2, 'SKU is required').max(50, 'SKU is too long'),
  type: z.enum(['Hardware', 'Electrical', 'Tool', 'Machinery', 'Spare Part']),
  categoryId: z.string().min(1, 'Category is required'),
  brandId: z.string().optional(),
  unitId: z.string().min(1, 'Unit is required'),
  description: z.string().optional(),
  barcode: z.string().optional(),
  costPrice: z.number().min(0, 'Cost price must be non-negative'),
  sellingPrice: z.number().min(0, 'Selling price must be non-negative'),
  purchasePrice: z.number().optional(),
  minPrice: z.number().optional(),
  taxRate: z.number().min(0).max(100, 'Tax rate must be between 0 and 100'),
  isTrackInventory: z.boolean(),
  isBatchTracked: z.boolean(),
  isSerialTracked: z.boolean(),
  reorderLevel: z.number().optional(),
  reorderQuantity: z.number().optional(),
  leadTimeDays: z.number().optional(),
  status: z.enum(['Active', 'Inactive', 'Discontinued']),
  supplierId: z.string().optional(),
  warrantyMonths: z.number().optional(),
  weight: z.number().optional(),
  specifications: z.record(z.string()).optional(),
  images: z.array(z.string()).optional(),
}).refine((data) => data.sellingPrice >= data.costPrice, {
  message: 'Selling price should be greater than or equal to cost price',
  path: ['sellingPrice'],
});

type ProductFormData = z.infer<typeof productSchema>;

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalL),
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toolbar: {
    display: 'flex',
    ...shorthands.gap(tokens.spacingHorizontalM),
    ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalL),
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
  },
  searchBox: {
    flexGrow: 1,
    maxWidth: '400px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    ...shorthands.gap(tokens.spacingHorizontalL),
  },
  productCard: {
    ...shorthands.padding(tokens.spacingVerticalL),
    height: '320px',
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
    ...shorthands.transition('all', '150ms', 'ease'),

    ':hover': {
      boxShadow: tokens.shadow8,
      transform: 'translateY(-2px)',
    },
  },
  productImage: {
    width: '100%',
    height: '160px',
    objectFit: 'cover',
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    marginBottom: tokens.spacingVerticalM,
    backgroundColor: tokens.colorNeutralBackground3,
  },
  productInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalS),
  },
  productHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  productFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
    paddingTop: tokens.spacingVerticalM,
    ...shorthands.borderTop('1px', 'solid', tokens.colorNeutralStroke2),
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '400px',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    ...shorthands.gap(tokens.spacingHorizontalM),
    marginTop: tokens.spacingVerticalL,
  },
  dialogSurface: {
    maxWidth: '900px',
    width: '90vw',
    maxHeight: '90vh',
  },
  dialogBody: {
    ...shorthands.overflow('auto'),
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    ...shorthands.gap(tokens.spacingVerticalL, tokens.spacingHorizontalL),
    marginTop: tokens.spacingVerticalM,
  },
  formGridFull: {
    gridColumn: '1 / -1',
  },
  tabContent: {
    marginTop: tokens.spacingVerticalL,
  },
  specificationRow: {
    display: 'flex',
    ...shorthands.gap(tokens.spacingHorizontalM),
    alignItems: 'flex-end',
    marginBottom: tokens.spacingVerticalM,
  },
  imageUploadArea: {
    ...shorthands.border('2px', 'dashed', tokens.colorNeutralStroke1),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    ...shorthands.padding(tokens.spacingVerticalXXL),
    textAlign: 'center' as const,
    cursor: 'pointer',
    ...shorthands.transition('all', '150ms', 'ease'),
  },
  imagePreviewGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
    ...shorthands.gap(tokens.spacingHorizontalM),
    marginTop: tokens.spacingVerticalM,
  },
  imagePreview: {
    position: 'relative',
    aspectRatio: '1',
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    ...shorthands.overflow('hidden'),
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
  },
  imagePreviewImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  imageDeleteBtn: {
    position: 'absolute',
    top: tokens.spacingVerticalS,
    right: tokens.spacingHorizontalS,
  },
  dialogActions: {
    ...shorthands.padding(tokens.spacingVerticalL, tokens.spacingHorizontalXL),
    ...shorthands.borderTop('1px', 'solid', tokens.colorNeutralStroke2),
    backgroundColor: tokens.colorNeutralBackground2,
    ...shorthands.gap(tokens.spacingHorizontalM),
  },
});

export const ProductList = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [products, setProducts] = useState<PaginatedResponse<Product> | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search, 500);

  // Dialog state
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [selectedTab, setSelectedTab] = useState('general');
  const [specifications, setSpecifications] = useState<Record<string, string>>({});
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Form setup
  const { control, handleSubmit, reset, formState: { errors }, watch } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      code: '',
      sku: '',
      type: 'Hardware',
      categoryId: '',
      unitId: '',
      description: '',
      costPrice: 0,
      sellingPrice: 0,
      taxRate: 0,
      isTrackInventory: true,
      isBatchTracked: false,
      isSerialTracked: false,
      status: 'Active',
      specifications: {},
      images: [],
    },
  });

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await apiService.products.list({ page, pageSize: 12, search: debouncedSearch });
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, debouncedSearch]);

  const openAddDialog = () => {
    setEditingProduct(null);
    reset({
      name: '',
      code: '',
      sku: '',
      type: 'Hardware',
      categoryId: '',
      unitId: '',
      description: '',
      costPrice: 0,
      sellingPrice: 0,
      taxRate: 0,
      isTrackInventory: true,
      isBatchTracked: false,
      isSerialTracked: false,
      status: 'Active',
      specifications: {},
      images: [],
    });
    setSpecifications({});
    setImages([]);
    setErrorMessage('');
    setSelectedTab('general');
    setIsDialogOpen(true);
  };

  const openEditDialog = (product: Product) => {
    setEditingProduct(product);
    reset({
      name: product.name,
      code: product.code,
      sku: product.sku,
      type: product.type,
      categoryId: product.categoryId,
      brandId: product.brandId,
      unitId: product.unitId,
      description: product.description,
      barcode: product.barcode,
      costPrice: product.costPrice,
      sellingPrice: product.sellingPrice,
      purchasePrice: product.purchasePrice,
      minPrice: product.minPrice,
      taxRate: product.taxRate,
      isTrackInventory: product.isTrackInventory,
      isBatchTracked: product.isBatchTracked,
      isSerialTracked: product.isSerialTracked,
      reorderLevel: product.reorderLevel,
      reorderQuantity: product.reorderQuantity,
      leadTimeDays: product.leadTimeDays,
      status: product.status,
      supplierId: product.supplierId,
      warrantyMonths: product.warrantyMonths,
      weight: product.weight,
      specifications: product.specifications,
      images: product.images,
    });
    setSpecifications(product.specifications || {});
    setImages(product.images || []);
    setErrorMessage('');
    setSelectedTab('general');
    setIsDialogOpen(true);
  };

  const onSubmit = async (data: ProductFormData) => {
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      if (editingProduct) {
        const updatePayload = {
          ...data,
          specifications,
          images,
          id: editingProduct.id,
        };
        await apiService.products.update(editingProduct.id, updatePayload as ProductAPI.UpdateRequest);
      } else {
        const createPayload = {
          ...data,
          specifications,
          images,
        };
        await apiService.products.create(createPayload as ProductAPI.CreateRequest);
      }

      setIsDialogOpen(false);
      // Refresh products list
      const refreshedData = await apiService.products.list({ page, pageSize: 12, search: debouncedSearch });
      setProducts(refreshedData);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Failed to save product');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddSpecification = () => {
    const key = `spec_${Date.now()}`;
    setSpecifications({ ...specifications, [key]: '' });
  };

  const handleRemoveSpecification = (key: string) => {
    const newSpecs = { ...specifications };
    delete newSpecs[key];
    setSpecifications(newSpecs);
  };

  const handleSpecificationChange = (oldKey: string, newKey: string, value: string) => {
    const newSpecs = { ...specifications };
    if (oldKey !== newKey && oldKey in newSpecs) {
      delete newSpecs[oldKey];
    }
    newSpecs[newKey] = value;
    setSpecifications(newSpecs);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // Simulate image upload - in real app, upload to server/CDN
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file));
      setImages([...images, ...newImages]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const getStatusColor = (status: string) => {
    return status === 'Active' ? 'success' : 'warning';
  };

  if (loading && !products) {
    return (
      <div className={classes.loading}>
        <Spinner size="large" label="Loading products..." />
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div>
          <Title3>Product Catalog</Title3>
          <Text>Manage your hardware machinery tools and electrical products</Text>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(_, data) => setIsDialogOpen(data.open)}>
          <DialogTrigger disableButtonEnhancement>
            <Button
              appearance="primary"
              icon={<Add20Regular />}
              onClick={openAddDialog}
            >
              Add Product
            </Button>
          </DialogTrigger>
          <DialogSurface className={classes.dialogSurface}>
            <DialogBody className={classes.dialogBody}>
              <DialogTitle>
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </DialogTitle>
              <DialogContent>
                {errorMessage && (
                  <MessageBar intent="error">
                    <MessageBarBody>{errorMessage}</MessageBarBody>
                  </MessageBar>
                )}

                <TabList selectedValue={selectedTab} onTabSelect={(_, data) => setSelectedTab(data.value as string)}>
                  <Tab value="general">General Info</Tab>
                  <Tab value="pricing">Pricing & Tax</Tab>
                  <Tab value="inventory">Inventory</Tab>
                  <Tab value="specifications">Specifications</Tab>
                  <Tab value="images">Images</Tab>
                </TabList>

                <form onSubmit={handleSubmit(onSubmit)}>
                  {/* General Info Tab */}
                  {selectedTab === 'general' && (
                    <div className={classes.tabContent}>
                      <div className={classes.formGrid}>
                        <Controller
                          name="name"
                          control={control}
                          render={({ field }) => (
                            <Field
                              label="Product Name"
                              required
                              validationMessage={errors.name?.message}
                              validationState={errors.name ? 'error' : 'none'}
                            >
                              <Input {...field} placeholder="Enter product name" />
                            </Field>
                          )}
                        />

                        <Controller
                          name="code"
                          control={control}
                          render={({ field }) => (
                            <Field
                              label="Product Code"
                              required
                              validationMessage={errors.code?.message}
                              validationState={errors.code ? 'error' : 'none'}
                            >
                              <Input {...field} placeholder="e.g., PRD-001" />
                            </Field>
                          )}
                        />

                        <Controller
                          name="sku"
                          control={control}
                          render={({ field }) => (
                            <Field
                              label="SKU"
                              required
                              validationMessage={errors.sku?.message}
                              validationState={errors.sku ? 'error' : 'none'}
                            >
                              <Input {...field} placeholder="Stock Keeping Unit" />
                            </Field>
                          )}
                        />

                        <Controller
                          name="barcode"
                          control={control}
                          render={({ field }) => (
                            <Field label="Barcode">
                              <Input {...field} placeholder="Barcode number" />
                            </Field>
                          )}
                        />

                        <Controller
                          name="type"
                          control={control}
                          render={({ field }) => (
                            <Field
                              label="Product Type"
                              required
                              validationMessage={errors.type?.message}
                              validationState={errors.type ? 'error' : 'none'}
                            >
                              <Dropdown
                                {...field}
                                value={field.value}
                                selectedOptions={[field.value]}
                                onOptionSelect={(_, data) => field.onChange(data.optionValue)}
                              >
                                <Option value="Hardware">Hardware</Option>
                                <Option value="Electrical">Electrical</Option>
                                <Option value="Tool">Tool</Option>
                                <Option value="Machinery">Machinery</Option>
                                <Option value="Spare Part">Spare Part</Option>
                              </Dropdown>
                            </Field>
                          )}
                        />

                        <Controller
                          name="status"
                          control={control}
                          render={({ field }) => (
                            <Field label="Status" required>
                              <Dropdown
                                {...field}
                                value={field.value}
                                selectedOptions={[field.value]}
                                onOptionSelect={(_, data) => field.onChange(data.optionValue)}
                              >
                                <Option value="Active">Active</Option>
                                <Option value="Inactive">Inactive</Option>
                                <Option value="Discontinued">Discontinued</Option>
                              </Dropdown>
                            </Field>
                          )}
                        />

                        <Controller
                          name="categoryId"
                          control={control}
                          render={({ field }) => (
                            <Field
                              label="Category"
                              required
                              validationMessage={errors.categoryId?.message}
                              validationState={errors.categoryId ? 'error' : 'none'}
                            >
                              <Input {...field} placeholder="Select category" />
                            </Field>
                          )}
                        />

                        <Controller
                          name="brandId"
                          control={control}
                          render={({ field }) => (
                            <Field label="Brand">
                              <Input {...field} placeholder="Select brand" />
                            </Field>
                          )}
                        />

                        <Controller
                          name="unitId"
                          control={control}
                          render={({ field }) => (
                            <Field
                              label="Unit of Measurement"
                              required
                              validationMessage={errors.unitId?.message}
                              validationState={errors.unitId ? 'error' : 'none'}
                            >
                              <Input {...field} placeholder="e.g., PCS, KG, MT" />
                            </Field>
                          )}
                        />

                        <Controller
                          name="supplierId"
                          control={control}
                          render={({ field }) => (
                            <Field label="Primary Supplier">
                              <Input {...field} placeholder="Select supplier" />
                            </Field>
                          )}
                        />

                        <Controller
                          name="warrantyMonths"
                          control={control}
                          render={({ field }) => (
                            <Field label="Warranty (Months)">
                              <Input
                                {...field}
                                type="number"
                                value={field.value?.toString() || ''}
                                onChange={(e) => field.onChange(Number(e.target.value) || undefined)}
                                placeholder="Warranty period"
                              />
                            </Field>
                          )}
                        />

                        <Controller
                          name="weight"
                          control={control}
                          render={({ field }) => (
                            <Field label="Weight (kg)">
                              <Input
                                {...field}
                                type="number"
                                value={field.value?.toString() || ''}
                                onChange={(e) => field.onChange(Number(e.target.value) || undefined)}
                                placeholder="Product weight"
                              />
                            </Field>
                          )}
                        />

                        <Controller
                          name="description"
                          control={control}
                          render={({ field }) => (
                            <Field label="Description" className={classes.formGridFull}>
                              <Textarea
                                {...field}
                                placeholder="Enter product description"
                                rows={4}
                              />
                            </Field>
                          )}
                        />
                      </div>
                    </div>
                  )}

                  {/* Pricing & Tax Tab */}
                  {selectedTab === 'pricing' && (
                    <div className={classes.tabContent}>
                      <div className={classes.formGrid}>
                        <Controller
                          name="costPrice"
                          control={control}
                          render={({ field }) => (
                            <Field
                              label="Cost Price"
                              required
                              validationMessage={errors.costPrice?.message}
                              validationState={errors.costPrice ? 'error' : 'none'}
                            >
                              <Input
                                {...field}
                                type="number"
                                value={field.value?.toString() || '0'}
                                onChange={(e) => field.onChange(Number(e.target.value))}
                                placeholder="0.00"
                              />
                            </Field>
                          )}
                        />

                        <Controller
                          name="sellingPrice"
                          control={control}
                          render={({ field }) => (
                            <Field
                              label="Selling Price"
                              required
                              validationMessage={errors.sellingPrice?.message}
                              validationState={errors.sellingPrice ? 'error' : 'none'}
                            >
                              <Input
                                {...field}
                                type="number"
                                value={field.value?.toString() || '0'}
                                onChange={(e) => field.onChange(Number(e.target.value))}
                                placeholder="0.00"
                              />
                            </Field>
                          )}
                        />

                        <Controller
                          name="purchasePrice"
                          control={control}
                          render={({ field }) => (
                            <Field label="Purchase Price">
                              <Input
                                {...field}
                                type="number"
                                value={field.value?.toString() || ''}
                                onChange={(e) => field.onChange(Number(e.target.value) || undefined)}
                                placeholder="0.00"
                              />
                            </Field>
                          )}
                        />

                        <Controller
                          name="minPrice"
                          control={control}
                          render={({ field }) => (
                            <Field label="Minimum Price">
                              <Input
                                {...field}
                                type="number"
                                value={field.value?.toString() || ''}
                                onChange={(e) => field.onChange(Number(e.target.value) || undefined)}
                                placeholder="0.00"
                              />
                            </Field>
                          )}
                        />

                        <Controller
                          name="taxRate"
                          control={control}
                          render={({ field }) => (
                            <Field
                              label="Tax Rate (%)"
                              required
                              validationMessage={errors.taxRate?.message}
                              validationState={errors.taxRate ? 'error' : 'none'}
                            >
                              <Input
                                {...field}
                                type="number"
                                value={field.value?.toString() || '0'}
                                onChange={(e) => field.onChange(Number(e.target.value))}
                                placeholder="0"
                              />
                            </Field>
                          )}
                        />
                      </div>

                      <div style={{ marginTop: tokens.spacingVerticalL }}>
                        <Text weight="semibold">Calculated Metrics</Text>
                        <div style={{ marginTop: tokens.spacingVerticalM }}>
                          <Text>Profit Margin: {watch('sellingPrice') > 0 ? (((watch('sellingPrice') - watch('costPrice')) / watch('sellingPrice')) * 100).toFixed(2) : 0}%</Text>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Inventory Tab */}
                  {selectedTab === 'inventory' && (
                    <div className={classes.tabContent}>
                      <div className={classes.formGrid}>
                        <Controller
                          name="isTrackInventory"
                          control={control}
                          render={({ field }) => (
                            <Field label="Track Inventory">
                              <Switch
                                checked={field.value}
                                onChange={(_, data) => field.onChange(data.checked)}
                                label={field.value ? 'Enabled' : 'Disabled'}
                              />
                            </Field>
                          )}
                        />

                        <Controller
                          name="isBatchTracked"
                          control={control}
                          render={({ field }) => (
                            <Field label="Batch Tracking">
                              <Switch
                                checked={field.value}
                                onChange={(_, data) => field.onChange(data.checked)}
                                label={field.value ? 'Enabled' : 'Disabled'}
                              />
                            </Field>
                          )}
                        />

                        <Controller
                          name="isSerialTracked"
                          control={control}
                          render={({ field }) => (
                            <Field label="Serial Tracking">
                              <Switch
                                checked={field.value}
                                onChange={(_, data) => field.onChange(data.checked)}
                                label={field.value ? 'Enabled' : 'Disabled'}
                              />
                            </Field>
                          )}
                        />

                        <div></div>

                        <Controller
                          name="reorderLevel"
                          control={control}
                          render={({ field }) => (
                            <Field label="Reorder Level">
                              <Input
                                {...field}
                                type="number"
                                value={field.value?.toString() || ''}
                                onChange={(e) => field.onChange(Number(e.target.value) || undefined)}
                                placeholder="Minimum stock level"
                              />
                            </Field>
                          )}
                        />

                        <Controller
                          name="reorderQuantity"
                          control={control}
                          render={({ field }) => (
                            <Field label="Reorder Quantity">
                              <Input
                                {...field}
                                type="number"
                                value={field.value?.toString() || ''}
                                onChange={(e) => field.onChange(Number(e.target.value) || undefined)}
                                placeholder="Quantity to reorder"
                              />
                            </Field>
                          )}
                        />

                        <Controller
                          name="leadTimeDays"
                          control={control}
                          render={({ field }) => (
                            <Field label="Lead Time (Days)">
                              <Input
                                {...field}
                                type="number"
                                value={field.value?.toString() || ''}
                                onChange={(e) => field.onChange(Number(e.target.value) || undefined)}
                                placeholder="Days to receive stock"
                              />
                            </Field>
                          )}
                        />
                      </div>
                    </div>
                  )}

                  {/* Specifications Tab */}
                  {selectedTab === 'specifications' && (
                    <div className={classes.tabContent}>
                      <Button
                        appearance="outline"
                        onClick={handleAddSpecification}
                        style={{ marginBottom: tokens.spacingVerticalL }}
                      >
                        Add Specification
                      </Button>

                      {Object.entries(specifications).map(([key, value]) => (
                        <div key={key} className={classes.specificationRow}>
                          <Input
                            placeholder="Specification name (e.g., Voltage)"
                            value={key.startsWith('spec_') ? '' : key}
                            onChange={(e) => handleSpecificationChange(key, e.target.value, value)}
                            style={{ flex: 1 }}
                          />
                          <Input
                            placeholder="Value (e.g., 220V)"
                            value={value}
                            onChange={(e) => handleSpecificationChange(key, key, e.target.value)}
                            style={{ flex: 1 }}
                          />
                          <Button
                            appearance="subtle"
                            icon={<Delete24Regular />}
                            onClick={() => handleRemoveSpecification(key)}
                          />
                        </div>
                      ))}

                      {Object.keys(specifications).length === 0 && (
                        <Text>No specifications added yet. Click "Add Specification" to get started.</Text>
                      )}
                    </div>
                  )}

                  {/* Images Tab */}
                  {selectedTab === 'images' && (
                    <div className={classes.tabContent}>
                      <div
                        className={classes.imageUploadArea}
                        onClick={() => document.getElementById('image-upload')?.click()}
                      >
                        <Image20Regular style={{ fontSize: '48px', marginBottom: tokens.spacingVerticalM }} />
                        <Text weight="semibold">Click to upload images</Text>
                        <Text size={200}>PNG, JPG, JPEG up to 5MB each</Text>
                      </div>
                      <input
                        id="image-upload"
                        type="file"
                        multiple
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleImageUpload}
                      />

                      {images.length > 0 && (
                        <div className={classes.imagePreviewGrid}>
                          {images.map((image, index) => (
                            <div key={index} className={classes.imagePreview}>
                              <img src={image} alt={`Product ${index + 1}`} className={classes.imagePreviewImg} />
                              <Button
                                className={classes.imageDeleteBtn}
                                appearance="subtle"
                                icon={<Dismiss20Regular />}
                                size="small"
                                onClick={() => handleRemoveImage(index)}
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </form>
              </DialogContent>
              <DialogActions>
                <DialogTrigger disableButtonEnhancement>
                  <Button appearance="secondary">Cancel</Button>
                </DialogTrigger>
                <Button
                  appearance="primary"
                  onClick={handleSubmit(onSubmit)}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <Spinner size="tiny" /> : (editingProduct ? 'Update Product' : 'Create Product')}
                </Button>
              </DialogActions>
            </DialogBody>
          </DialogSurface>
        </Dialog>
      </div>

      <Card className={classes.toolbar}>
        <Input
          className={classes.searchBox}
          placeholder="Search products..."
          contentBefore={<Search20Regular />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button appearance="subtle">Filter</Button>
        <Button appearance="subtle">Sort</Button>
        <Button appearance="subtle">Export</Button>
      </Card>

      {loading ? (
        <div className={classes.loading}>
          <Spinner size="large" label="Loading..." />
        </div>
      ) : (
        <>
          <div className={classes.grid}>
            {products?.data.map((product) => (
              <Card
                key={product.id}
                className={classes.productCard}
                onClick={() => navigate(`/products/${product.id}`)}
              >
                <img
                  src={product.images[0] || '/placeholder-product.jpg'}
                  alt={product.name}
                  className={classes.productImage}
                />

                <div className={classes.productInfo}>
                  <div className={classes.productHeader}>
                    <Text weight="semibold" size={400} truncate>
                      {product.name}
                    </Text>
                    <Menu>
                      <MenuTrigger disableButtonEnhancement>
                        <Button
                          appearance="subtle"
                          icon={<MoreVertical20Regular />}
                          size="small"
                          onClick={(e) => e.stopPropagation()}
                        />
                      </MenuTrigger>
                      <MenuPopover>
                        <MenuList>
                          <MenuItem 
                            icon={<Eye20Regular />}
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/products/${product.id}`);
                            }}
                          >
                            View
                          </MenuItem>
                          <MenuItem 
                            icon={<Edit20Regular />}
                            onClick={(e) => {
                              e.stopPropagation();
                              openEditDialog(product);
                            }}
                          >
                            Edit
                          </MenuItem>
                          <MenuItem icon={<Delete20Regular />}>Delete</MenuItem>
                        </MenuList>
                      </MenuPopover>
                    </Menu>
                  </div>

                  <Text size={200} truncate>
                    {product.code}
                  </Text>

                  <div style={{ display: 'flex', gap: tokens.spacingHorizontalS }}>
                    <Badge appearance="filled" color={getStatusColor(product.status)}>
                      {product.status}
                    </Badge>
                    <Badge appearance="outline">{product.type}</Badge>
                  </div>
                </div>

                <div className={classes.productFooter}>
                  <div>
                    <Text size={200}>Selling Price</Text>
                    <Text weight="semibold" size={500}>
                      {formatCurrency(product.sellingPrice)}
                    </Text>
                  </div>
                  <Text size={200}>SKU: {product.sku}</Text>
                </div>
              </Card>
            ))}
          </div>

          {products && products.totalPages > 1 && (
            <div className={classes.pagination}>
              <Button
                appearance="subtle"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                Previous
              </Button>
              <Text>
                Page {page} of {products.totalPages}
              </Text>
              <Button
                appearance="subtle"
                disabled={page === products.totalPages}
                onClick={() => setPage(page + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
