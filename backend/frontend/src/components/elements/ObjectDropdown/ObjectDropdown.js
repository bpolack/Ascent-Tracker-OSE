import React, { Component } from 'react';
import { Menu, Transition } from '@headlessui/react';

// Fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

export class ObjectDropdown extends Component {
	render() {
		return (
			<Menu as="div" className="absolute right-3 top-3 inline-block text-left">
				{({ open }) => (
					<>
						<Menu.Button className="inline-flex justify-center items-center w-full px-4 py-2 text-sm font-medium text-white dark:text-gray-800 bg-gray-800 dark:bg-white rounded-full bg-opacity-60 hover:bg-opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
							Options
							<FontAwesomeIcon icon={faChevronDown} className="ml-2" />
						</Menu.Button>
						<Transition
							show={open} 
							enter="transition ease-out duration-100"
							enterFrom="transform opacity-0 scale-95"
							enterTo="transform opacity-100 scale-100"
							leave="transition ease-in duration-75"
							leaveFrom="transform opacity-100 scale-100"
							leaveTo="transform opacity-0 scale-95"
						>
							<Menu.Items static className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-10 focus:outline-none">
								<div className="px-1 py-1 ">
									<Menu.Item onClick={this.props.handleEdit}>
										{({ active }) => (
											<button
												className={`${active ? 'bg-pink-500 text-white' : 'text-gray-900'
													} group flex rounded-md items-center w-full px-2 py-2 text-sm`}
											>
												<FontAwesomeIcon icon={faPencilAlt} className="mr-3" />
												Edit
											</button>
										)}
									</Menu.Item>
								</div>
								<div className="px-1 py-1">
									<Menu.Item onClick={this.props.handleDelete}>
										{({ active }) => (
											<button
												className={`${active ? 'bg-pink-500 text-white' : 'text-gray-900'
													} group flex rounded-md items-center w-full px-2 py-2 text-sm`}
											>
												<FontAwesomeIcon icon={faTrash} className="mr-3" />
												Delete
											</button>
										)}
									</Menu.Item>
								</div>
							</Menu.Items>
						</Transition>
					</>
      			)}
			</Menu>
		)
	}
}

export default ObjectDropdown
