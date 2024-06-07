import {
  Button,
  Center,
  Group,
  Image,
  Menu,
  Stack,
  Text,
  TextInput
} from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { useState } from 'react';
import { Token, tokens } from '../utils/tokens';
import { ChevronDown } from 'tabler-icons-react';
import { useSendToken } from '../hooks/useSendToken';

type SendProps = {
  isDarkTheme: boolean;
  setIsSendOpen: (open: boolean) => void;
  provider: any;
};

export function Send(props: SendProps) {
  const { sendToken } = useSendToken();
  const [opened, setOpened] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [sendAmount, setSendAmount] = useState<number>(0);
  const [recepient, setRecepient] = useState<string>('');
  const [selectedToken, setSelectedToken] = useState<Token | null>(tokens[0]);

  const textStyle = {
    color: props.isDarkTheme ? 'white' : 'black'
  };

  const handleChangeToken = (token: Token) => {
    setSelectedToken(token);
    // setTokenId(id);
    setOpened(false);
  };

  return (
    <>
      {/* <TonConnectButton /> */}
      <Group
        onClick={() => props.setIsSendOpen(false)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'left',
          borderWidth: '0',
          cursor: 'pointer'
        }}
      >
        <IconArrowLeft size={'20px'} style={textStyle} />
        <Text size="20px" style={textStyle}>
          Back
        </Text>
      </Group>

      <Stack
        align="center"
        gap="md"
        style={{
          marginTop: '15px',
          backgroundColor: 'transparent',
          width: '100%'
        }}
      >
        <Menu width={100} position="right-end">
          <Menu.Target>
            <Button
              size="lg"
              variant="transparent"
              style={{
                color: props.isDarkTheme ? 'white' : 'black',
                backgroundColor: 'trasnsparent'
              }}
              rightSection={<ChevronDown size={25} />}
            >
              {<Image w={40} src={tokens[0].icon} />}
            </Button>
          </Menu.Target>
          <Menu.Dropdown style={{ width: '100px' }}>
            {tokens.map((tk) => (
              <Menu.Item key={tk.symbol} onClick={() => handleChangeToken(tk)}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%'
                  }}
                >
                  <span>{tk.symbol}</span>
                  <Image src={tk.icon} style={{ width: 20, height: 20 }} />
                </div>
              </Menu.Item>
            ))}
          </Menu.Dropdown>
        </Menu>
        <Stack gap={'50px'} h={200}>
          <TextInput
            className="inputClass"
            placeholder="UqBs..."
            style={{ width: '90vw' }}
            h={50}
            description={
              <div
                style={{
                  ...textStyle,
                  textAlign: 'left',
                  fontSize: '17px',
                  marginBottom: '15px'
                }}
              >
                Recipient Address
              </div>
            }
            onChange={(event) => setRecepient(event.currentTarget.value)}
          />

          <TextInput
            className="inputClass"
            placeholder="0.01"
            style={{ width: '90vw' }}
            h={50}
            description={
              <div
                style={{
                  ...textStyle,
                  textAlign: 'left',
                  fontSize: '17px',
                  marginBottom: '15px'
                }}
              >
                Amount
              </div>
            }
            onChange={(event) =>
              setSendAmount(Number(event.currentTarget.value))
            }
          />
        </Stack>
      </Stack>

      <Button
        size="20px"
        loading={loading}
        disabled={loading}
        w={'80wv'}
        h={'50px'}
        style={{ color: 'white' }}
        onClick={() => {
          sendToken(props.provider, recepient, sendAmount);
        }}
      >
        Confirm
      </Button>
    </>
  );
}
