import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'



function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Home = () => {
    const { user, logout } = useContext(UserContext);

    const userDetail = {
        name: user.name,
        email: user.email,
        imageUrl:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      }
      const navigation = [
        { name: 'Dashboard', href: '/dashboard', current: false },
        { name: 'Users', href: '/users', current: false },
        // { name: 'Projects', href: '{() => false}', current: false },
        // { name: 'Calendar', href: '{() => false}', current: false },
        // { name: 'Reports', href: '{() => false}', current: false },
      ]
      const userNavigation = [
        { name: 'Your Profile', href: '/profile' },
        // { name: 'Settings', href: '{() => false}' },
        //{ name: 'Sign out', href: '{() => false}' },
      ]
    return (
        <>

        <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="h-18 w-20"
                        src="https://vouchpro.com/wp-content/uploads/2021/02/vouch-pro-white.svg?color=indigo&shade=500"
                        alt="VouchPro - Virtual Events & Webinars"
                      />
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            className={classNames(
                              item.current
                                ? 'bg-gray-900 text-white'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                              'rounded-md px-3 py-2 text-sm font-medium'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      <button
                        type="button"
                        className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>

                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="sr-only">Open user menu</span>
                            <img className="h-8 w-8 rounded-full" src={userDetail.imageUrl} alt="" />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <Link
                                    to={item.href}
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700'
                                    )}
                                  >
                                    {item.name}
                                  </Link>
                                )}
                              </Menu.Item>
                            ))}
                            <a href={() => false} className="block px-4 py-2 text-sm text-gray-700" id="headlessui-menu-item-:rh:" role="menuitem" tabindex="-1" data-headlessui-state="" onClick={logout}>Sign out</a>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block rounded-md px-3 py-2 text-base font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="border-t border-gray-700 pb-3 pt-4">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img className="h-10 w-10 rounded-full" src={userDetail.imageUrl} alt="" />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">{userDetail.name}</div>
                      <div className="text-sm font-medium leading-none text-gray-400">{userDetail.email}</div>
                    </div>
                    <button
                      type="button"
                      className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {userNavigation.map((item) => (
                       <Link
                       to={item.href}
                       className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                     >
                       {item.name}
                     </Link>
                    ))}
                    <a href={() => false} className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white" data-headlessui-state="open" onClick={logout}>Sign out</a>
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Profile</h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl py-2 sm:px-2 lg:px-2">
            {/* Your content Start */}
                    <div className="h-screen bg-gray-200  dark:bg-gray-800   flex flex-wrap items-center  justify-center  ">
                        <div className="container lg:w-2/6 xl:w-2/7 sm:w-full md:w-2/3    bg-white  shadow-lg    transform   duration-200 easy-in-out">
                            <div className=" h-32 overflow-hidden" >
                                <img className="w-full" src="https://images.unsplash.com/photo-1605379399642-870262d3d051?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" alt="" />
                            </div>
                            <div className="flex justify-center px-5  -mt-12">
                                <img className="h-32 w-32 bg-white p-2 rounded-full" src={userDetail.imageUrl} alt="" />

                            </div>
                            <div className=" ">
                                <div className="text-center px-14">
                                    <h2 className="text-gray-800 text-3xl font-bold">{userDetail.name}</h2>
                                    <span className="text-gray-400 mt-2 hover:text-blue-500">{userDetail.email}</span>
                                    <h4 className="text-black-800 hover:text-gray-500"><span style={{color:'#E22128'}}>Vouch</span>Pro - Virtual Events &amp; Webinars</h4>
                                    <p className="mt-2 text-gray-500 text-sm text-left">We offer one-stop-solution for its customers as it provides an array of services right from virtual and hybrid events including live streaming solutions, video APIs, and digital activations, and customer engagement enablers. </p>
                                </div>
                                <hr className="mt-6" />
                                <div className="flex  bg-gray-50 ">
                                    <div className="text-center w-1/2 p-4 hover:bg-gray-100 cursor-pointer">
                                        <p><span className="font-semibold">2.5 k </span> Followers</p>
                                    </div>
                                    <div className="border"></div>
                                    <div className="text-center w-1/2 p-4 hover:bg-gray-100 cursor-pointer">
                                        <p> <span className="font-semibold">2.0 k </span> Following</p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
            {/* Your content End*/}
          </div>
        </main>
      </div>
      </>
    )
}

export default Home;