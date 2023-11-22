import React from "react";
import { useAccountQueries } from "../../queries/accountQueries";
import { Card, ListItem, ListItemIcon, ListItemText, CardHeader } from "@mui/material";
import List from "@mui/material/List";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.primary,
  minHeight: 60,
  lineHeight: "60px",
}));

const AccountSummary = () => {
      const { useGetAccountsQuery } = useAccountQueries();
      const { data: accounts } = useGetAccountsQuery();

      //make one card with credit and debit and 
      const wealthSummary = {
        "Debt": 0,
        "NetWorth": 0
      }

      
      if(accounts)
      {
        accounts.forEach(account => {
            if( account.debt)
            {
                wealthSummary.Debt += account.amount
            }
            else  {
                wealthSummary.NetWorth += account.amount
            }
            
        });
      }

      return (
        <Card>
          <CardHeader title="Wealth Summary"/>
          <List>
            <ListItem>
              <ListItemIcon>
                <AccountBalanceIcon />
              </ListItemIcon>
              <ListItemText>
                <Item>{` Net Worth :  ${wealthSummary.NetWorth}`}</Item>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CreditCardIcon />
              </ListItemIcon>
              <ListItemText>
                <Item>{` Debt :  ${wealthSummary.Debt}`}</Item>
              </ListItemText>
            </ListItem>
          </List>
        </Card>
      );

};

export default AccountSummary;