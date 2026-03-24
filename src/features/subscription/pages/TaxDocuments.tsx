import {
  makeStyles,
  shorthands,
  tokens,
  Card,
  Title3,
  Title2,
  Text,
  Button,
  Input,
  Dropdown,
  Option,
  Checkbox,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogBody,
  DialogTitle,
  DialogActions,
  Link,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHeaderCell,
  Badge,
} from '@fluentui/react-components';
import { ArrowDownload20Regular, DocumentPdf20Regular, DocumentAdd20Regular, CheckmarkCircle20Regular } from '@fluentui/react-icons';
import { useState } from 'react';
import { useAppSelector } from '@/store/hooks';
import { selectCurrentSubscription } from '@/features/subscription/slices/subscriptionSlice';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalXL),
  },
  headerCard: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    ...shorthands.padding(tokens.spacingVerticalXL, tokens.spacingHorizontalXL),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
  },
  infoCard: {
    ...shorthands.padding(tokens.spacingVerticalL),
    backgroundColor: '#F0F9FF',
    borderLeft: `4px solid ${tokens.colorBrandBackground}`,
  },
  contentSection: {
    ...shorthands.padding(tokens.spacingVerticalL),
  },
  documentGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    ...shorthands.gap(tokens.spacingVerticalL),
    marginTop: tokens.spacingVerticalL,
  },
  documentCard: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalM),
    ...shorthands.padding(tokens.spacingVerticalL),
    position: 'relative',
  },
  documentHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    ...shorthands.gap(tokens.spacingHorizontalXS),
    ...shorthands.padding(tokens.spacingVerticalXS, tokens.spacingHorizontalS),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    backgroundColor: '#D4F1E4',
    color: '#107C10',
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
  },
  taxForm: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalL),
  },
  formSection: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalM),
  },
  twoColumnGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    ...shorthands.gap(tokens.spacingHorizontalL),
  },
  complianceTable: {
    marginTop: tokens.spacingVerticalL,
  },
});

interface TaxDocument {
  id: string;
  type: 'form-1099' | 'tax-summary' | 'annual-certificate' | 'vat-report';
  year: number;
  status: 'ready' | 'pending' | 'not-available';
  uploadedDate?: string;
  filename: string;
}

const TAX_DOCUMENTS: TaxDocument[] = [
  {
    id: '1',
    type: 'tax-summary',
    year: 2024,
    status: 'ready',
    uploadedDate: '2024-01-15',
    filename: 'Tax_Summary_2024.pdf',
  },
  {
    id: '2',
    type: 'annual-certificate',
    year: 2023,
    status: 'ready',
    uploadedDate: '2023-12-01',
    filename: 'Annual_Certificate_2023.pdf',
  },
  {
    id: '3',
    type: 'vat-report',
    year: 2024,
    status: 'pending',
    filename: 'VAT_Report_2024.pdf',
  },
  {
    id: '4',
    type: 'tax-summary',
    year: 2023,
    status: 'ready',
    uploadedDate: '2022-12-15',
    filename: 'Tax_Summary_2023.pdf',
  },
];

const COMPLIANCE_REQUIREMENTS = [
  {
    requirement: 'Tax Identification Number (TIN)',
    status: 'verified',
    description: 'Your tax identification number is verified and on file',
  },
  {
    requirement: 'W-9 Form (US Taxpayers)',
    status: 'provided',
    description: 'Completed W-9 form received and stored securely',
  },
  {
    requirement: 'VAT Registration',
    status: 'verified',
    description: 'VAT number verified for EU transactions',
  },
  {
    requirement: 'Address Verification',
    status: 'verified',
    description: 'Business address verified and up-to-date',
  },
];

export const TaxDocuments = () => {
  const classes = useStyles();
  const currentSubscription = useAppSelector(selectCurrentSubscription);
  
  const [documents, setDocuments] = useState<TaxDocument[]>(TAX_DOCUMENTS);
  const [selectedYear, setSelectedYear] = useState('2024');
  const [w9DialogOpen, setW9DialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    ein: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  });

  const handleDownloadDocument = (doc: TaxDocument) => {
    console.log('Downloading document:', doc.filename);
  };

  const handleSubmitW9 = () => {
    console.log('Submitting W-9 form:', formData);
    setW9DialogOpen(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ready':
        return <Badge icon={<CheckmarkCircle20Regular />} appearance="filled">Ready</Badge>;
      case 'pending':
        return <Badge appearance="outline">Pending</Badge>;
      case 'not-available':
        return <Badge appearance="subtle">Not Available</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.headerCard}>
        <Title3 style={{ color: 'inherit', marginBottom: tokens.spacingVerticalS }}>
          Tax Documents & Compliance
        </Title3>
        <Text style={{ color: 'inherit' }}>
          Manage tax documents, compliance information, and regulatory requirements
        </Text>
      </div>

      <Card className={classes.infoCard}>
        <div style={{ display: 'flex', gap: tokens.spacingHorizontalM, alignItems: 'flex-start' }}>
          <div>
            <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalXS }}>
              ℹ️ Tax Filing Information
            </Text>
            <Text size={200}>
              All tax documents are prepared in accordance with applicable tax regulations. Please verify information accuracy before filing. Consult with a tax professional for guidance on your specific tax obligations.
            </Text>
          </div>
        </div>
      </Card>

      <Card className={classes.contentSection}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: tokens.spacingVerticalL }}>
          <Title2>Tax Documents by Year</Title2>
        </div>

        <Dropdown
          value={selectedYear}
          onOptionSelect={(_, data) => setSelectedYear(data.optionValue || '2024')}
          style={{ marginBottom: tokens.spacingVerticalL, maxWidth: '200px' }}
        >
          <Option value="2024">2024</Option>
          <Option value="2023">2023</Option>
          <Option value="2022">2022</Option>
          <Option value="2021">2021</Option>
        </Dropdown>

        <div className={classes.documentGrid}>
          {documents
            .filter((doc) => doc.year.toString() === selectedYear)
            .map((doc) => (
              <Card key={doc.id} className={classes.documentCard}>
                <div className={classes.documentHeader}>
                  <div>
                    <Text weight="semibold" block>
                      {doc.type === 'form-1099' && '1099 Form'}
                      {doc.type === 'tax-summary' && 'Tax Summary'}
                      {doc.type === 'annual-certificate' && 'Annual Certificate'}
                      {doc.type === 'vat-report' && 'VAT Report'}
                    </Text>
                    <Text size={200} block style={{ marginTop: tokens.spacingVerticalXS }}>
                      {doc.year}
                    </Text>
                  </div>
                  {getStatusBadge(doc.status)}
                </div>

                <Text size={200}>
                  {doc.status === 'ready' && doc.uploadedDate && (
                    <>
                      Available since {new Date(doc.uploadedDate).toLocaleDateString()}
                    </>
                  )}
                  {doc.status === 'pending' && (
                    <>
                      Document is being prepared. Check back soon.
                    </>
                  )}
                  {doc.status === 'not-available' && (
                    <>
                      Not applicable for your account
                    </>
                  )}
                </Text>

                {doc.status === 'ready' && (
                  <Button
                    appearance="primary"
                    icon={<Download20Regular />}
                    onClick={() => handleDownloadDocument(doc)}
                  >
                    Download PDF
                  </Button>
                )}
              </Card>
            ))}
        </div>

        {documents.filter((doc) => doc.year.toString() === selectedYear).length === 0 && (
          <div style={{ textAlign: 'center', padding: tokens.spacingVerticalXL }}>
            <Text>No documents available for {selectedYear}</Text>
          </div>
        )}
      </Card>

      <Card className={classes.contentSection}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: tokens.spacingVerticalL }}>
          <Title2>Compliance & Tax Information</Title2>
          <Dialog open={w9DialogOpen} onOpenChange={(_, data) => setW9DialogOpen(data.open)}>
            <DialogTrigger>
              <Button appearance="primary" icon={<DocumentAdd20Regular />}>
                Provide Tax Information
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Complete Tax Information Form</DialogTitle>
              <DialogBody>
                <div className={classes.taxForm}>
                  <Text>
                    Please provide your tax information for accurate tax document generation and compliance reporting.
                  </Text>

                  <div className={classes.formSection}>
                    <Text weight="semibold">Business Information</Text>
                    <Input
                      placeholder="Your business name"
                      value={formData.businessName}
                      onChange={(_, value) => setFormData({ ...formData, businessName: value || '' })}
                    />
                    <Input
                      placeholder="XX-XXXXXXX"
                      value={formData.ein}
                      onChange={(_, value) => setFormData({ ...formData, ein: value || '' })}
                    />
                  </div>

                  <div className={classes.formSection}>
                    <Text weight="semibold">Address Information</Text>
                    <Input
                      placeholder="123 Main St"
                      value={formData.address}
                      onChange={(_, value) => setFormData({ ...formData, address: value || '' })}
                    />
                    <div className={classes.twoColumnGrid} style={{ gridTemplateColumns: '2fr 1fr 1fr' }}>
                      <Input
                        placeholder="City"
                        value={formData.city}
                        onChange={(_, value) => setFormData({ ...formData, city: value || '' })}
                      />
                      <Input
                        placeholder="State"
                        value={formData.state}
                        onChange={(_, value) => setFormData({ ...formData, state: value || '' })}
                      />
                      <Input
                        placeholder="ZIP"
                        value={formData.zip}
                        onChange={(_, value) => setFormData({ ...formData, zip: value || '' })}
                      />
                    </div>
                  </div>

                  <div style={{ backgroundColor: '#FFF4CE', ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalM), ...shorthands.borderRadius(tokens.borderRadiusMedium) }}>
                    <Text size={200}>
                      💡 Your information is encrypted and stored securely in compliance with data protection regulations.
                    </Text>
                  </div>
                </div>
              </DialogBody>
              <DialogActions>
                <Button appearance="secondary" onClick={() => setW9DialogOpen(false)}>
                  Cancel
                </Button>
                <Button appearance="primary" onClick={handleSubmitW9}>
                  Submit Information
                </Button>
              </DialogActions>
            </DialogContent>
          </Dialog>
        </div>

        <Table className={classes.complianceTable}>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Requirement</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Description</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {COMPLIANCE_REQUIREMENTS.map((req, idx) => (
              <TableRow key={idx}>
                <TableCell>{req.requirement}</TableCell>
                <TableCell>
                  <div className={classes.badge}>
                    <CheckmarkCircle20Regular />
                    {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                  </div>
                </TableCell>
                <TableCell>{req.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Card className={classes.contentSection} style={{ backgroundColor: tokens.colorNeutralBackgroundInverted, color: tokens.colorNeutralForegroundInverted }}>
        <Title3 style={{ color: 'inherit', marginBottom: tokens.spacingVerticalM }}>Additional Resources</Title3>
        <Text style={{ color: 'inherit', marginBottom: tokens.spacingVerticalM }}>
          Learn more about tax compliance and how we help manage your tax documentation.
        </Text>
        <div style={{ display: 'flex', flexDirection: 'column', ...shorthands.gap(tokens.spacingVerticalS) }}>
          <Link href="#">Download Tax Guide (PDF)</Link>
          <Link href="#">Understanding Your Tax Documents</Link>
          <Link href="#">Contact Tax Support</Link>
          <Link href="#">View Tax Policy</Link>
        </div>
      </Card>
    </div>
  );
};
