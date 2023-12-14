export default function AddEventButton() {
	return (
		<div
			className="cursor-pointer text-center text-7xl"
			onClick={() => {
				alert("Dodawanie zdarzenia");
			}}
		>
			+
		</div>
	);
}
