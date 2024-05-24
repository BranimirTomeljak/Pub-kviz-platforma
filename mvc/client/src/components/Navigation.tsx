import { useAuth0 } from "@auth0/auth0-react";
import { Button, Flex, Heading, Link, Text } from "@chakra-ui/react";
import { FC } from "react";
import { LogoutButton } from "./LogoutButton";
import { LoginButton } from "./LoginButton";

export const Navigation: FC = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  return (
    <Flex
      align="center"
      justify="space-between"
      w="100vw"
      mb="60px"
      p="10px 20px"
      shadow="base"
      bgColor="white"
    >
      <Heading as={Link} href="/" style={{ textDecoration: "none" }}>
        <Flex align="center" justify="center">
          <Text>PKP</Text>
        </Flex>
      </Heading>
      <Flex>
        {isLoading ? null : isAuthenticated ? (
          <>
            <Button as={Link} href="/profile" colorScheme="teal" mr="15px">
              Profile
            </Button>
            <LogoutButton />
          </>
        ) : (
          <LoginButton />
        )}
      </Flex>
    </Flex>
  );
};