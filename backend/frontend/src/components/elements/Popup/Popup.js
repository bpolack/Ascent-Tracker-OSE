import React, { Fragment, Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Dialog, Transition } from "@headlessui/react";

// Fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export class Popup extends Component {

	render() {

		const {open, closeModal} = this.props;

		return (
			<Transition show={open} as={Fragment}>
				<Dialog
					as="div"
					className={`${this.props.focus ? 'dark' : '' } fixed inset-0 z-40 overflow-y-auto`}
					static
					open={open}
					onClose={closeModal}
				>
					<div className="min-h-screen px-4 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<Dialog.Overlay className="fixed inset-0 backdrop-filter backdrop-blur-sm" />
						</Transition.Child>

						{/* This element is to trick the browser into centering the modal contents. */}
						<span
							className="inline-block h-screen align-middle"
							aria-hidden="true"
						>
							&#8203;
            			</span>
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<div className="relative bg-ascent-std text-ascent-std inline-block shadow-lg w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform rounded-xl border-solid border-transparent dark:border-white dark:border-opacity-30 border-t border-b">
								<Dialog.Title
									as="h3"
									className="text-xl font-medium mb-4 leading-6"
								>
									{this.props.title}
                				</Dialog.Title>
								<div className="mt-2">
									{this.props.children}
								</div>

								<button onClick={closeModal} className="absolute top-0 right-0 py-3 px-4 text-gray-800 dark:text-white hover:text-pink-500 dark:hover:text-pink-500 focus:outline-none">
									<FontAwesomeIcon icon={faTimes} />
								</button>
							</div>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition>
		)
	}
}

Popup.propTypes = {
	focus: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
	focus: state.focus
});

export default connect(mapStateToProps)(Popup)
