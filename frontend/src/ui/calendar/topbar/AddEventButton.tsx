import { Popover } from "@headlessui/react";
import AddForm from "./AddForm";

export default function AddEventButton() {
	return (
		<Popover className="relative">
			<Popover.Button className="cursor-pointer text-center text-7xl">
				+
			</Popover.Button>
			<Popover.Panel className="absolute z-10">
				<AddForm />
			</Popover.Panel>
		</Popover>
	);
}
