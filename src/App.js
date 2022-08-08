import React, { useEffect, useState } from "react";
import { tokenToText } from "@vvv-interactive/nftanvil-tools/cjs/token.js";

import {
  useAnvilDispatch,
  useAnvilSelector,
} from "@vvv-interactive/nftanvil-react";
import { nft_enter_code } from "@vvv-interactive/nftanvil-react/cjs/reducers/nft";
import { Wallet } from "@vvv-interactive/nftanvil-react/cjs/components/Wallet";
import { IconButton } from "@chakra-ui/react";

import {
  Inventory,
  InventoryLarge,
} from "@vvv-interactive/nftanvil-react/cjs/components/Inventory";

import powered from "./assets/powered.dark.svg";
import {
  MarketplaceLoad,
  MarketplaceFilters,
} from "@vvv-interactive/nftanvil-react/cjs/components/Marketplace";
import { Flex, Spacer } from "@chakra-ui/react";
import { NFTPage } from "@vvv-interactive/nftanvil-react/cjs/components/NFT";

import { ToastContainer } from "react-toastify";
import {
  NavLink,
  Routes,
  Route,
  useNavigate,
  useParams,
} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Box, Button, Stack, HStack, Wrap } from "@chakra-ui/react";
import { Select, Text } from "@chakra-ui/react";
import logo from "./assets/logo.svg";
import { CloseIcon } from "@chakra-ui/icons";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Flex m="5">
        <Box>
          <img src={logo} className="logo" />
        </Box>
        <Spacer />
        <PageTabs />
        <Box w="3" />
        <Wallet />
      </Flex>
      <div className="inner-page">
        <Routes>
          <Route path="/" element={<PageMk />} />

          <Route path="/nfta:id/:code" element={<NFTPageWrapper />} />
          <Route path="/nfta:id" element={<NFTPageWrapper />} />
          <Route path="/inventory" element={<PageInventory />} />
          <Route path="/marketplace" element={<PageMk />} />

          <Route path="/:code" element={<NFTClaimWrapper />} />
        </Routes>

        <ToastContainer theme="dark" />
      </div>
      <Footer />
    </div>
  );
}

function NFTPageWrapper() {
  let { id, code } = useParams();
  return <NFTPage id={"nfta" + id} code={code} />;
}

function NFTClaimWrapper() {
  let { code } = useParams();

  let navigate = useNavigate();
  const dispatch = useAnvilDispatch();
  const go = async () => {
    const url = await dispatch(nft_enter_code(code));
    navigate(url);
  };
  useEffect(() => {
    go();
  }, [code, dispatch]);

  return null;
}

function PageMk() {
  let navigate = useNavigate();
  const [filterTags, setFilterTags] = useState([]);

  return (
    <>
      <MarketplaceLoad
        author={
          "a00aa2d5f5f9738e300615f21104cd06bbeb86bb8daee215525ac2ffde621bed" //, // "a004f41ea1a46f5b7e9e9639fbed84e037d9ce66b75d392d2c1640bb7a559cda" // "bbd87200973033cb69bc0aee03e90df1a1de01e28aa0246bb175baabfd071754"
        }
      >
        {(items) => (
          <MarketplaceFilters
            items={items}
            filterTags={filterTags}
            // attributes={[
            //   ["attack", "with attack"],
            //   ["airdrops", "width airdrops"],
            // ]}
          >
            {({
              goPageBack,
              goPageNext,
              stats,
              fOrder,
              fQuality,
              fTags,
              slice,
              tagsLeft,
            }) => {
              return (
                <HStack spacing={10} p={3} alignItems="start">
                  <Stack minW={"300px"} maxW={"600px"} pt="90px">
                    {fOrder}
                    {/* {fTags} */}

                    {filterTags.map((tag) => (
                      <Flex key={tag}>
                        <Text pl="4">{tag}</Text>
                        <Spacer />
                        <IconButton
                          icon={<CloseIcon />}
                          size="xs"
                          ml="2"
                          onClick={() => {
                            setFilterTags([
                              ...filterTags.filter((x) => x !== tag),
                            ]);
                          }}
                        />
                      </Flex>
                    ))}
                    {tagsLeft.length ? (
                      <Select
                        onChange={(e) => {
                          if (e.target.value === "-") return;
                          setFilterTags([...filterTags, e.target.value]);
                          e.target.value = null;
                        }}
                      >
                        <option value="-">select</option>
                        {tagsLeft.map((tag, tagidx) => (
                          <option key={tagidx} value={tag}>
                            {tag}
                          </option>
                        ))}
                      </Select>
                    ) : null}
                    <Text pl="4">
                      {stats ? <div>Floor: {stats.floor}</div> : null}
                      {stats ? <div>Mean: {stats.mean}</div> : null}
                    </Text>
                  </Stack>

                  <Box>
                    <Flex>
                      <Spacer />
                      <HStack>
                        {goPageBack}
                        {goPageNext}
                      </HStack>
                    </Flex>

                    <InventoryLarge
                      items={slice.map((x) => tokenToText(x[0]))}
                      custom={(meta) => {
                        return (
                          <div style={{ paddingTop: "8px", width: "80%" }}>
                            {meta.name}
                          </div>
                        );
                      }}
                      onOpenNft={(id) => {
                        navigate("/" + id); //, { replace: true }
                      }}
                    />
                    <Flex>
                      <Spacer />
                      <HStack>
                        {goPageBack}
                        {goPageNext}
                      </HStack>
                    </Flex>
                  </Box>
                </HStack>
              );
            }}
          </MarketplaceFilters>
        )}
      </MarketplaceLoad>
    </>
  );
}

function PageInventory() {
  let navigate = useNavigate();

  const address = useAnvilSelector((state) => state.user.address);

  return (
    <>
      <Inventory
        address={address}
        onOpenNft={(id) => {
          navigate("/" + id); //, { replace: true }
        }}
      />
    </>
  );
}

function Footer() {
  return (
    <div className="footer">
      <NavLink to="/terms">Terms &amp; Conditions</NavLink>
      <a target="_blank" href="https://docs.nftanvil.com">
        <img
          src={powered}
          style={{
            display: "block",
            margin: "auto",
            width: "200px",
            marginTop: "30px",
          }}
        />
      </a>
    </div>
  );
}

function PageTabs(p) {
  const address = useAnvilSelector((state) => state.user.address);

  return (
    <Box {...p}>
      <Wrap spacing="3" justify="center">
        <NavLink to="/marketplace">
          {({ isActive }) => (
            <Button isActive={isActive} variant="solid" colorScheme="blue">
              Marketplace
            </Button>
          )}
        </NavLink>
        {address ? (
          <NavLink to="/inventory">
            {({ isActive }) => (
              <Button isActive={isActive} variant="solid" colorScheme="blue">
                Inventory
              </Button>
            )}
          </NavLink>
        ) : null}
      </Wrap>
    </Box>
  );
}

export default App;
