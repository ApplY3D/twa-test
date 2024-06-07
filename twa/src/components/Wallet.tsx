import {
  Card,
  Text,
  Group,
  Button,
  Stack,
  Divider,
  Box,
  Image
} from '@mantine/core';
import { useEffect, useState } from 'react';
import { Token, tokens } from '../utils/tokens';
import { chartDark, chartLight } from '../assets';
import { ArrowNarrowUp, ArrowNarrowDown } from 'tabler-icons-react';
import { Send } from './Send';
import { CopyButtonIcon } from './CopyButtonIcon';
import { contractAddress, testAddress1 } from '../utils/addresses';
import { shortenAddress } from '../utils/shortenAddr';
import { IconMoonFilled, IconSun } from '@tabler/icons-react';
import { TonConnectButton } from '@tonconnect/ui-react';

type WalletProps = {
  isDarkTheme: boolean;
  toggleTheme: () => void;
};
export function Wallet(props: WalletProps) {
  const [totalValue, setTotalValue] = useState<number>(23);
  const textStyle = {
    color: props.isDarkTheme ? 'white' : 'black'
  };
  const [isSendOpen, setIsSendOpen] = useState<boolean>(false);

  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);

  console.log('account: ', account);

  useEffect(() => {
    // @ts-ignore
    if (typeof window.ton !== 'undefined') {
      console.log('OpenMask is installed!');
      // @ts-ignore
      setProvider(window.ton);
      console.log('provider: ', provider);
    }

    const getAccs = async () => {
      if (provider && !account) {
        //@ts-ignore
        const accounts = await provider.send('ton_requestAccounts');
        setAccount(accounts[0]);
      }
    };
    getAccs();
  });

  useEffect(() => {
    let totalValue = 0;
    tokens.map((t) => {
      const value = t.balance * t.price;
      totalValue += value;
    });

    setTotalValue(totalValue);
  });

  return (
    <>
      <Card p="lg" style={{ backgroundColor: 'transparent' }}>
        {isSendOpen ? (
          <Send
            isDarkTheme={props.isDarkTheme}
            setIsSendOpen={setIsSendOpen}
            provider={provider}
          />
        ) : (
          <>
            <TonConnectButton style={{ marginLeft: 'auto' }} />

            <Group justify="space-between" mt={10} mx={10}>
              <Group mb={10}>
                <Text size="20px" style={{ ...textStyle }}>
                  Tom & Ben:
                </Text>
                <Text
                  mr={-5}
                  size="20px"
                  style={{ ...textStyle, textDecoration: 'underline' }}
                >
                  {contractAddress ? shortenAddress(contractAddress) : ''}
                </Text>
                <CopyButtonIcon address={contractAddress} />
              </Group>
              {/* <Box mb={5}>
                {props.isDarkTheme ? (
                  <IconSun
                    style={{ color: 'white' }}
                    onClick={() => {
                      props.toggleTheme();
                    }}
                  />
                ) : (
                  <IconMoonFilled
                    style={{ color: 'black' }}
                    onClick={() => {
                      props.toggleTheme();
                    }}
                  />
                )}
              </Box> */}
            </Group>
            <Text
              ml={20}
              mb={10}
              size="md"
              style={{ ...textStyle, opacity: '70%' }}
            >
              Shared Account
            </Text>
            <Stack mt={10} mb={30} align="center">
              <Image
                w={300}
                radius={5}
                src={props.isDarkTheme ? chartDark : chartLight}
              />
            </Stack>

            {/* Action Buttons */}
            <Group grow gap={8}>
              <Button
                variant="filled"
                leftSection={
                  <ArrowNarrowUp size={14} style={{ marginRight: '-8px' }} />
                }
                radius="sm"
                onClick={() => setIsSendOpen(true)}
              >
                Send
              </Button>
              <Button
                variant="filled"
                leftSection={
                  <ArrowNarrowDown size={14} style={{ marginRight: '-8px' }} />
                }
                radius="sm"
              >
                Receive
              </Button>
              <Button variant="filled" radius="sm">
                Earn
              </Button>
            </Group>

            <Divider style={{ margin: '20px 0' }} />

            {/* Token Balances */}
            <Group mb={20} mx={20} justify="space-between">
              <Text style={textStyle} size="20px">
                Tokens
              </Text>
              <Text style={textStyle} size="20px">
                {`${totalValue} $`}
              </Text>
            </Group>
            <Box style={{ overflowY: 'auto' }}>
              <Stack align="center" gap="1px">
                {tokens.map((token: Token, index: number) => (
                  <Box
                    key={token.symbol}
                    style={{
                      width: '100%',
                      cursor: 'pointer'
                    }}
                  >
                    <Group
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <Group
                        gap={10}
                        pr={15}
                        pl={10}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}
                      >
                        {<Image w={20} src={token.icon} />}
                        <Text
                          style={{
                            ...textStyle,
                            fontSize: '16px'
                          }}
                        >
                          {token.name}
                        </Text>
                      </Group>
                      <Text
                        style={{
                          ...textStyle,
                          fontSize: '15px'
                        }}
                      >
                        {token.balance} {''}
                        {token.symbol}
                      </Text>
                    </Group>
                    <Divider style={{ margin: '15px 0' }} />
                  </Box>
                ))}
              </Stack>
            </Box>
          </>
        )}
      </Card>
    </>
  );
}
