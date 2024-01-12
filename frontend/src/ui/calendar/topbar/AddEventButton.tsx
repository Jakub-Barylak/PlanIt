import { Popover } from "@headlessui/react";
import AddForm from "./AddForm";
import { FaPlus } from "react-icons/fa";

export default function AddEventButton() {
	return (
		<Popover className="relative flex h-full w-full items-center justify-center">
			<Popover.Button className="cursor-pointer text-center text-4xl">
				<FaPlus />
			</Popover.Button>
			<Popover.Panel className="absolute z-10">
				<AddForm />
			</Popover.Panel>
		</Popover>
	);
}
