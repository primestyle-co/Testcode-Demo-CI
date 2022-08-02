<?php

declare(strict_types=1);

namespace Tests\Feature\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PostControllerTest extends TestCase
{
    use RefreshDatabase;

    private $user;

    public function setUp(): void
    {
        parent::setUp();
        $this->initData();
    }

    public function testIndexWithoutAuth()
    {
        $response = $this->getJson('api/posts');
        $response->assertStatus(401);
    }

    /**
     * test testIndexSuccess
     *
     * @dataProvider indexProvider
     *
     * @param mixed $filterParams
     * @param mixed $total
     * @param mixed $currentCount
     * @param mixed $testSorting
     */
    // public function testIndexSuccess($filterParams, $total, $currentCount, $testSorting = false)
    // {
    //     $this->actingAs($this->user);
    //     $response = $this->getJson('/api/posts?' . http_build_query($filterParams));
    //     $response->assertStatus(200);
    //     $response->assertJsonPath('posts.total', $total);
    //     $response->assertJsonCount($currentCount, 'posts.data');

    //     if ($testSorting) {
    //         for ($idx = 0; $idx < $currentCount - 1; $idx++) {
    //             $current = $response->json('posts.data')[$idx];
    //             $next = $response->json('posts.data')[$idx + 1];

    //             if ($filterParams['sort_direction'] == 'desc') {
    //                 self::assertTrue($current[$filterParams['sort_field']] >= $next[$filterParams['sort_field']]);
    //             } else {
    //                 self::assertTrue($current[$filterParams['sort_field']] <= $next[$filterParams['sort_field']]);
    //             }
    //         }
    //     }
    // }

    /**
     * test testCreateValidateMessage
     *
     * @dataProvider createValidateMessageProvider
     *
     * @param mixed $params
     * @param mixed $errors
     */
    // public function testCreateValidateMessage($params, $errors)
    // {
    //     $this->actingAs($this->user);
    //     $response = $this->postJson('api/posts/create', $params);
    //     $response->assertStatus(422);
    //     // $response->assertExactJson('errors', $errors);
    //     $response->assertJson(['errors' => $errors]);
    // }

    /**
     * test testCreatePostSuccess
     */
    public function testCreateSuccess()
    {
        $this->actingAs($this->user);
        $data = [
            'title' => 'test1',
            'content' => 'content 1'
        ];
        $response = $this->postJson('api/posts/create', $data);
        $response->assertStatus(200);
        $response->assertJsonPath('status', 'ok');
        $this->assertDatabaseHas('posts', $data + ['created_by' => $this->user->id]);
    }

    /**
     * test testStoreValidateMessage
     *
     * @dataProvider storeValidateMessageProvider
     *
     * @param mixed $params
     * @param mixed $errors
     */
    // public function testStoreValidateMessage($params, $errors)
    // {
    //     $this->actingAs($this->user);

    //     $post = Post::factory()->create([
    //         'title' => 'test 1',
    //         'created_by' => $this->user->id,
    //     ]);
    //     $response = $this->postJson('api/posts/' . $post->id, $params);
    //     $response->assertStatus(422);
    //     // $response->assertExactJson('errors', $errors);
    //     $response->assertJson(['errors' => $errors]);
    // }

    // public function testCannotEditPostOfAnotherUser()
    // {
    //     $this->actingAs($this->user);

    //     $user = User::factory()->create();
    //     $post = Post::factory()->create([
    //         'title' => 'test 1',
    //         'created_by' => $user->id,
    //     ]);
    //     $response = $this->postJson('api/posts/' . $post->id, [
    //         'title' => 'title update',
    //         'content' => 'content update',
    //     ]);
    //     $response->assertStatus(404);
    // }

    /**
     * test testStoreSuccess
     */
    public function testStoreSuccess()
    {
        $this->actingAs($this->user);
        $post = Post::factory()->create([
            'title' => 'test 1',
            'created_by' => $this->user->id,
        ]);
        $data = [
            'title' => 'title 1 update',
            'content' => 'content 1 update'
        ];
        $response = $this->postJson('api/posts/' . $post->id, $data);
        $response->assertStatus(200);
        $response->assertJsonPath('status', 'ok');
        $this->assertDatabaseHas('posts', $data);
    }

    /**
     * test testDetailPostNotExistInDatabase
     */
    public function testDetailPostNotExistInDatabase()
    {
        $this->actingAs($this->user);

        $post = Post::factory()->create([
            'title' => 'test 1',
            'created_by' => $this->user->id,
        ]);

        $response = $this->getJson('api/posts/' . 100);
        $response->assertStatus(404);
    }

    /**
     * test testDetailSuccess
     */
    public function testDetailSuccess()
    {
        $this->actingAs($this->user);

        $post = Post::factory()->create([
            'title' => 'test 1',
            'content' => 'content 1',
            'created_by' => $this->user->id,
        ]);

        $response = $this->getJson('api/posts/' . $post->id);
        $response->assertStatus(200);
        $response->assertJsonPath('status', 'ok');
        $response->assertJson(['post' => [
            'id' => $post->id,
            'title' => $post->title,
            'content' => $post->content,
            'created_by' => $this->user->id,
        ]]);
    }

    /**
     * test testDeletePostNotExistInDatabase
     */
    // public function testDeletePostNotExistInDatabase()
    // {
    //     $this->actingAs($this->user);
    //     $response = $this->postJson('api/posts/delete/' . 100);
    //     $response->assertStatus(404);
    // }

    /**
     * test testCannotDeletePostOfAnotherUser
     */
    public function testCannotDeletePostOfAnotherUser()
    {
        $this->actingAs($this->user);

        $user = User::factory()->create();

        $post = Post::factory()->create([
            'title' => 'test 1',
            'content' => 'content 1',
            'created_by' => $user->id,
        ]);

        $response = $this->postJson('api/posts/delete/' . $post->id);
        $response->assertStatus(404);
    }

    /**
     * test testDeleteSuccess
     */
    public function testDeleteSuccess()
    {
        $this->actingAs($this->user);

        $post = Post::factory()->create([
            'title' => 'test 1',
            'content' => 'content 1',
            'created_by' => $this->user->id,
        ]);

        $response = $this->postJson('api/posts/delete/' . $post->id);
        $response->assertStatus(200);
        $response->assertJsonPath('status', 'ok');
        $this->assertSoftDeleted('posts', [
            'id' => $post->id
        ]);
    }

    private function initData()
    {
        $user = User::factory()->create();
        $this->user = $user;

        for ($i = 0; $i < 5; $i++) {
            Post::factory()->create([
                'title' => 'aaa' . $i,
                'created_by' => $user->id,
            ]);
        }

        for ($i = 0; $i < 5; $i++) {
            Post::factory()->create([
                'title' => 'ccc' . $i,
                'created_by' => $user->id,
            ]);
        }

        for ($i = 0; $i < 5; $i++) {
            Post::factory()->create([
                'title' => 'bbb' . $i,
                'created_by' => $user->id,
            ]);
        }
    }

    private function indexProvider()
    {
        return [
            // case 1: init
            [
                [
                    'title' => '',
                    'author' => '',
                    'page' => 1
                ],
                15,
                10
            ],
            // case 2: filter by title
            [
                [
                    'title' => 'aa',
                    'author' => '',
                    'page' => 1
                ],
                5,
                5
            ],
            // case 3: filter by special character
            [
                [
                    'title' => "'",
                    'author' => '',
                    'page' => 1
                ],
                0,
                0
            ],
            // case 4: paging
            [
                [
                    'title' => '',
                    'author' => '',
                    'page' => 2
                ],
                15,
                5
            ],
            // case 5: paging
            [
                [
                    'title' => '',
                    'author' => '',
                    'page' => 3
                ],
                15,
                0
            ],
            // case 6: sorting
            [
                [
                    'title' => '',
                    'author' => '',
                    'sort_field' => 'title',
                    'sort_direction' => 'asc',
                    'page' => 1
                ],
                15,
                10,
                true
            ],
            // case 7: sorting
            [
                [
                    'title' => '',
                    'author' => '',
                    'sort_field' => 'title',
                    'sort_direction' => 'desc',
                    'page' => 1
                ],
                15,
                10,
                true
            ],
        ];
    }

    private function createValidateMessageProvider()
    {
        return [
            // case 1: title empty
            [
                [
                    'title' => '',
                    'content' => 'test1',
                ],
                [
                    'title' => [
                        'The title field is required.'
                    ],
                ]
            ],
            // case 2: content empty
            [
                [
                    'title' => 'test 1',
                    'content' => '',
                ],
                [
                    'content' => [
                        'The content field is required.'
                    ]
                ]
            ],
            // case 3:
            [
                [
                    'title' => '',
                    'content' => '',
                ],
                [
                    'title' => [
                        'The title field is required.'
                    ],
                    'content' => [
                        'The content field is required.'
                    ]
                ]
            ],
        ];
    }

    private function storeValidateMessageProvider()
    {
        return [
            // case 1: title empty
            [
                [
                    'title' => '',
                    'content' => 'test1',
                ],
                [
                    'title' => [
                        'The title field is required.'
                    ],
                ]
            ],
            // case 2: content empty
            [
                [
                    'title' => 'test 1',
                    'content' => '',
                ],
                [
                    'content' => [
                        'The content field is required.'
                    ]
                ]
            ],
            // case 3:
            [
                [
                    'title' => '',
                    'content' => '',
                ],
                [
                    'title' => [
                        'The title field is required.'
                    ],
                    'content' => [
                        'The content field is required.'
                    ]
                ]
            ],
        ];
    }
}
