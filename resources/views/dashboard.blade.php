<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Dashboard') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 bg-white border-b border-gray-200">
                    You're logged in!
                </div>

            </div>
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 bg-white border-b border-gray-200">
                 
                    <iframe
                    width="960"
                    height="720"
                    src="https://ap-northeast-1.quicksight.aws.amazon.com/sn/embed/share/accounts/217511598673/dashboards/b10484ed-71f0-4c22-ae3c-d4d72ee9365a?directory_alias=locphuongpl">
                </iframe>
                </div>
                
            </div>
        </div>
    </div>
</x-app-layout>
