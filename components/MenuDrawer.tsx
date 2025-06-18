import React from "react";

import { Button } from "./ui/button";
import { ButtonText } from "./ui/button";
import { Drawer } from "./ui/drawer";
import { DrawerHeader } from "./ui/drawer";
import { DrawerBackdrop } from "./ui/drawer";
import { DrawerBody } from "./ui/drawer";
import { DrawerContent } from "./ui/drawer";
import { DrawerFooter } from "./ui/drawer";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";

export function MenuDrawer({ showDrawer, setShowDrawer }) {
  return (
    <>
      <Button
        className="px-12 py-6 border-white border-[0.5px]"
        size="lg"
        variant="outline"
        onPress={() => setShowDrawer(true)}
      >
        <ButtonText
          style={{
            fontFamily: "SneakyTimes",
            fontSize: 14,
            lineHeight: 32,
            color: "white",
            textAlign: "center",
          }}
        >
          Meny
        </ButtonText>
      </Button>

      <Drawer
        isOpen={showDrawer}
        onClose={() => setShowDrawer(false)}
        size="sm"
        anchor="left"
      >
        <DrawerBackdrop />
        <DrawerContent>
          <DrawerHeader>
            <Heading size="3xl">Heading</Heading>
          </DrawerHeader>
          <DrawerBody>
            <Text size="2xl" className="text-typography-800">
              This is a sentence.
            </Text>
          </DrawerBody>
          <DrawerFooter>
            <Button onPress={() => setShowDrawer(false)} className="flex-1">
              <ButtonText>Button</ButtonText>
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
