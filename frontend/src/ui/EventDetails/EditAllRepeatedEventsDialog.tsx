import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

type EditAllRepeatedEventsDialogProps = {
	isOpen: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	sendRequest: (editAll: boolean) => void;
};

export default function EditAllRepeatedEventsDialog(
	props: EditAllRepeatedEventsDialogProps,
) {
	return (
		<Transition appear={true} show={props.isOpen} as={Fragment}>
			<Dialog
				open={props.isOpen}
				onClose={() => props.setOpen(false)}
				className="relative z-50"
			>
				{/* The backdrop, rendered as a fixed sibling to the panel container */}
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black/25" />
				</Transition.Child>

				{/* Full-screen container to center the panel */}
				<div className="fixed inset-0 flex w-screen items-center justify-center p-4">
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0 scale-95"
						enterTo="opacity-100 scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 scale-100"
						leaveTo="opacity-0 scale-95"
					>
						{/* The actual dialog panel  */}
						<Dialog.Panel className="grid grid-cols-4 grid-rows-2 rounded bg-white p-4">
							<Dialog.Title
								className={
									"col-start-1 col-end-5 mb-2 w-full text-center text-lg font-semibold"
								}
							>
								Edit all repeated events?
							</Dialog.Title>
							<div className="col-start-1 col-end-3 flex items-center justify-center">
								<button
									className="rounded bg-green-500 px-4 py-2 text-white"
									onClick={() => {
										props.setOpen(false);
										props.sendRequest(true);
									}}
								>
									Yes, <br />
									edit all events
								</button>
							</div>
							<div className="col-start-3 col-end-5 flex items-center justify-center">
								<button
									className=" rounded bg-red-500 px-4 py-2 text-white"
									onClick={() => {
										props.setOpen(false);
										props.sendRequest(false);
									}}
								>
									No, <br />
									edit only this one
								</button>
							</div>
						</Dialog.Panel>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition>
	);
}
