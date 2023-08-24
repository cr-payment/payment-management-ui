import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useBillSlice } from '../slice';
import { selectBill, selectBillData } from '../slice/selectors';
import { useSelector } from 'react-redux';

import { Typography, Box, Grid } from '@mui/material';

const InfoLine = ({ label, value }) => {
  return (
    <Box display="flex" alignItems="center">
      <Typography variant="body1">{label}</Typography>
      <Box flexGrow={1} mx={2}></Box>
      <Typography variant="body1" style={{ fontWeight: 'bold' }}>
        {value}
      </Typography>
    </Box>
  );
};

export default function Bill() {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');

  const handleClickOpen = (scrollType: DialogProps['scroll']) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  //   load billInfo from state
  const { actions } = useBillSlice();
  const { billData: billInfo } = useSelector(selectBill);

  return (
    <div>
      <Button onClick={handleClickOpen('paper')}>Billing popup</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        fullWidth={true}
        maxWidth={'md'}
      >
        <DialogTitle id="scroll-dialog-title">Billing Information</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          {billInfo ? (
            <Grid container spacing={5}>
              <Grid item xs={6}>
                <InfoLine label="Name" value={billInfo.name} />
                <InfoLine label="Email" value={billInfo.email} />
                <InfoLine label="Number" value={billInfo.number} />
              </Grid>
              <Grid item xs={6}>
                {billInfo.cart.map((bill: { name: string; price: number }) => (
                  <InfoLine label={bill.name} value={bill.price} />
                ))}

                <Box
                  flexGrow={15}
                  borderBottom="1px solid #ccc"
                  mx={2}
                  my={4}
                ></Box>

                <InfoLine label="Shipping" value={billInfo.shipping} />
                <InfoLine label="Total" value={billInfo.total} />
                <InfoLine
                  label="Paid in"
                  value={`${billInfo.paidIn} ${billInfo.token}`}
                />
                <InfoLine label="TxHash" value={billInfo.transactionHash} />
              </Grid>
            </Grid>
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
